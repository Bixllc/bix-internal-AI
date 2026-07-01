import { getFirecrawlKey, getGooglePlacesKey, getOpenAIKey } from './env'

export interface SystemStatusItem {
  label: string
  status: 'healthy' | 'degraded' | 'down'
  detail: string
}

export function getSystemStatus(): SystemStatusItem[] {
  return [
    {
      label: 'Google Places API',
      status: getGooglePlacesKey() ? 'healthy' : 'down',
      detail: getGooglePlacesKey() ? 'Configured' : 'Missing GOOGLE_PLACES_API_KEY',
    },
    {
      label: 'Website Analyzer',
      status: 'healthy',
      detail: getFirecrawlKey() ? 'Firecrawl' : 'Basic fetcher fallback',
    },
    {
      label: 'AI Report Generation',
      status: getOpenAIKey() ? 'healthy' : 'down',
      detail: getOpenAIKey() ? 'Configured' : 'Missing OPENAI_API_KEY',
    },
  ]
}
