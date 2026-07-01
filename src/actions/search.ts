'use server'

import { searchGooglePlaces, type GooglePlaceLead } from '../lib/googlePlaces'
import { ok, fail, type ActionResult } from '../lib/actionResult'

export interface LeadSearchInput {
  industry: string
  location: string
  maxResults: number
}

export async function searchLeadsAction(
  input: LeadSearchInput,
): Promise<ActionResult<GooglePlaceLead[]>> {
  if (!input.industry.trim() || !input.location.trim()) {
    return fail('Enter both an industry and a location to search.')
  }

  try {
    const leads = await searchGooglePlaces(input)
    return ok(leads)
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Google Places search failed unexpectedly.')
  }
}
