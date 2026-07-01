import { getFirecrawlKey } from './env'

export interface FetchedPage {
  url: string
  text: string
}

const CANDIDATE_PATHS = ['', '/services', '/booking', '/contact', '/about', '/faq']
const MAX_CHARS_PER_PAGE = 6000
const FETCH_TIMEOUT_MS = 12000

function normalizeBaseUrl(website: string): string {
  const trimmed = website.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}

async function fetchViaFirecrawl(url: string, apiKey: string): Promise<string | null> {
  try {
    const res = await fetchWithTimeout('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, formats: ['markdown'] }),
    })
    if (!res.ok) return null
    const json = await res.json()
    return json?.data?.markdown ?? null
  } catch {
    return null
  }
}

async function fetchViaBasic(url: string): Promise<string | null> {
  try {
    const res = await fetchWithTimeout(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BixScoutBot/1.0)' },
    })
    if (!res.ok) return null
    const contentType = res.headers.get('content-type') ?? ''
    if (!contentType.includes('text/html') && !contentType.includes('text')) return null
    const html = await res.text()
    return htmlToText(html)
  } catch {
    return null
  }
}

/**
 * Fetches the homepage plus a handful of common subpages. The homepage must
 * succeed (thrown error surfaces as "website fetch failed" to the caller);
 * subpages are best-effort and silently skipped if missing.
 */
export async function fetchWebsiteContent(website: string): Promise<FetchedPage[]> {
  const baseUrl = normalizeBaseUrl(website)
  const firecrawlKey = getFirecrawlKey()

  async function fetchPage(path: string): Promise<FetchedPage | null> {
    const pageUrl = new URL(path, baseUrl).toString()
    const content = firecrawlKey
      ? (await fetchViaFirecrawl(pageUrl, firecrawlKey)) ?? (await fetchViaBasic(pageUrl))
      : await fetchViaBasic(pageUrl)

    if (content && content.trim().length > 0) {
      return { url: pageUrl, text: content.trim().slice(0, MAX_CHARS_PER_PAGE) }
    }
    return null
  }

  const [homepage, ...rest] = await Promise.all(CANDIDATE_PATHS.map(fetchPage))

  if (!homepage) {
    // Homepage failing entirely means we have nothing to analyze.
    throw new Error(
      `Could not fetch ${baseUrl}. The site may be down, blocking automated requests, or the URL may be incorrect.`,
    )
  }

  return [homepage, ...rest.filter((page): page is FetchedPage => page !== null)]
}
