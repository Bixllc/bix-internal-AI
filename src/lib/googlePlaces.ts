import { getGooglePlacesKey } from './env'

export interface GooglePlaceLead {
  businessName: string
  website: string | null
  phone: string | null
  address: string | null
  googlePlaceId: string
  googleMapsUrl: string | null
}

interface TextSearchResult {
  place_id: string
  name: string
  formatted_address?: string
}

interface TextSearchResponse {
  status: string
  error_message?: string
  results: TextSearchResult[]
  next_page_token?: string
}

interface PlaceDetailsResponse {
  status: string
  error_message?: string
  result?: {
    formatted_phone_number?: string
    website?: string
    url?: string
  }
}

const TEXT_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
const DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json'

function friendlyStatusError(status: string, errorMessage?: string): string {
  switch (status) {
    case 'ZERO_RESULTS':
      return 'ZERO_RESULTS'
    case 'REQUEST_DENIED':
      return `Google Places request was denied — check that GOOGLE_PLACES_API_KEY is valid and the Places API is enabled. ${errorMessage ?? ''}`.trim()
    case 'OVER_QUERY_LIMIT':
      return 'Google Places API quota exceeded for today. Try again later.'
    case 'INVALID_REQUEST':
      return 'Google Places request was invalid — check the industry/location input.'
    default:
      return `Google Places API error (${status}). ${errorMessage ?? ''}`.trim()
  }
}

async function fetchDetails(placeId: string, apiKey: string) {
  const url = new URL(DETAILS_URL)
  url.searchParams.set('place_id', placeId)
  url.searchParams.set('fields', 'formatted_phone_number,website,url')
  url.searchParams.set('key', apiKey)

  const res = await fetch(url.toString())
  const json = (await res.json()) as PlaceDetailsResponse
  if (json.status !== 'OK') return null
  return json.result ?? null
}

async function mapWithConcurrency<T, R>(items: T[], concurrency: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let index = 0
  async function worker() {
    while (index < items.length) {
      const current = index++
      results[current] = await fn(items[current])
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker))
  return results
}

export async function searchGooglePlaces(params: {
  industry: string
  location: string
  maxResults: number
}): Promise<GooglePlaceLead[]> {
  const apiKey = getGooglePlacesKey()
  if (!apiKey) {
    throw new Error('GOOGLE_PLACES_API_KEY is not configured. Add it to your .env file to search for leads.')
  }

  const query = `${params.industry} in ${params.location}`
  const maxResults = Math.min(Math.max(params.maxResults, 1), 60)

  const allResults: TextSearchResult[] = []
  let pageToken: string | undefined
  let firstStatus: string | undefined

  do {
    const url = new URL(TEXT_SEARCH_URL)
    url.searchParams.set('query', query)
    url.searchParams.set('key', apiKey)
    if (pageToken) {
      url.searchParams.set('pagetoken', pageToken)
      // Google requires a short delay before a page token becomes valid.
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    const res = await fetch(url.toString())
    if (!res.ok) {
      throw new Error(`Google Places request failed with HTTP ${res.status}.`)
    }
    const json = (await res.json()) as TextSearchResponse
    firstStatus = firstStatus ?? json.status

    if (json.status !== 'OK' && json.status !== 'ZERO_RESULTS') {
      throw new Error(friendlyStatusError(json.status, json.error_message))
    }

    allResults.push(...json.results)
    pageToken = allResults.length < maxResults ? json.next_page_token : undefined
  } while (pageToken)

  if (firstStatus === 'ZERO_RESULTS' || allResults.length === 0) {
    return []
  }

  const limited = allResults.slice(0, maxResults)

  const details = await mapWithConcurrency(limited, 8, (place) => fetchDetails(place.place_id, apiKey))

  return limited.map((place, i) => {
    const detail = details[i]
    return {
      businessName: place.name,
      website: detail?.website ?? null,
      phone: detail?.formatted_phone_number ?? null,
      address: place.formatted_address ?? null,
      googlePlaceId: place.place_id,
      googleMapsUrl: detail?.url ?? null,
    }
  })
}
