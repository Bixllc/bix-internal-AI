export function getGooglePlacesKey(): string | null {
  return process.env.GOOGLE_PLACES_API_KEY?.trim() || null
}

export function getOpenAIKey(): string | null {
  return process.env.OPENAI_API_KEY?.trim() || null
}

export function getOpenAIModel(): string {
  return process.env.OPENAI_MODEL?.trim() || 'gpt-4o'
}

export function getFirecrawlKey(): string | null {
  return process.env.FIRECRAWL_API_KEY?.trim() || null
}
