import { getGooglePlacesKey } from './env'

export interface GooglePlaceLead {
  businessName: string
  website: string | null
  phone: string | null
  address: string | null
  googlePlaceId: string
  googleMapsUrl: string | null
}

interface NewPlace {
  id: string
  displayName?: { text?: string }
  formattedAddress?: string
  websiteUri?: string
  nationalPhoneNumber?: string
  googleMapsUri?: string
}

interface SearchTextResponse {
  places?: NewPlace[]
  nextPageToken?: string
  error?: { code: number; status: string; message: string }
}

const SEARCH_TEXT_URL = 'https://places.googleapis.com/v1/places:searchText'

// The New API returns contact details inline via the field mask, so one request
// per page covers everything — no per-place Details lookup needed.
const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.websiteUri',
  'places.nationalPhoneNumber',
  'places.googleMapsUri',
  'nextPageToken',
].join(',')

// searchText caps a single page at 20 results.
const MAX_PAGE_SIZE = 20

function friendlyError(status: string, message: string): string {
  switch (status) {
    case 'PERMISSION_DENIED':
      return `Google Places request was denied — check that GOOGLE_PLACES_API_KEY is valid and that "Places API (New)" is enabled for the project. ${message}`.trim()
    case 'RESOURCE_EXHAUSTED':
      return 'Google Places API quota exceeded. Try again later.'
    case 'INVALID_ARGUMENT':
      return 'Google Places request was invalid — check the industry/location input.'
    case 'UNAUTHENTICATED':
      return 'Google Places rejected the API key. Verify GOOGLE_PLACES_API_KEY in your environment.'
    default:
      return `Google Places API error (${status}). ${message}`.trim()
  }
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

  const textQuery = `${params.industry} in ${params.location}`
  const maxResults = Math.min(Math.max(params.maxResults, 1), 60)

  const collected: NewPlace[] = []
  let pageToken: string | undefined

  do {
    const body: Record<string, unknown> = {
      textQuery,
      pageSize: Math.min(maxResults - collected.length, MAX_PAGE_SIZE),
    }
    if (pageToken) body.pageToken = pageToken

    const res = await fetch(SEARCH_TEXT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': FIELD_MASK,
      },
      body: JSON.stringify(body),
    })

    const json = (await res.json().catch(() => null)) as SearchTextResponse | null

    if (!res.ok) {
      if (json?.error) throw new Error(friendlyError(json.error.status, json.error.message))
      throw new Error(`Google Places request failed with HTTP ${res.status}.`)
    }
    if (json?.error) {
      throw new Error(friendlyError(json.error.status, json.error.message))
    }

    const places = json?.places ?? []
    collected.push(...places)

    // An empty page means the result set is exhausted, even if a token came back.
    pageToken = places.length > 0 && collected.length < maxResults ? json?.nextPageToken : undefined
  } while (pageToken)

  return collected.slice(0, maxResults).map((place) => ({
    businessName: place.displayName?.text ?? 'Unknown business',
    website: place.websiteUri ?? null,
    phone: place.nationalPhoneNumber ?? null,
    address: place.formattedAddress ?? null,
    googlePlaceId: place.id,
    googleMapsUrl: place.googleMapsUri ?? null,
  }))
}
