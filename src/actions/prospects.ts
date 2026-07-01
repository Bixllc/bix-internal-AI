'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../lib/db'
import { normalizeWebsite } from '../lib/normalizeWebsite'
import { ok, fail, type ActionResult } from '../lib/actionResult'
import type { GooglePlaceLead } from '../lib/googlePlaces'
import type { ProspectStatus, InternalNote } from '../types'

export interface SaveProspectsInput extends GooglePlaceLead {
  industry: string
  location: string
}

export async function saveProspectsAction(
  leads: SaveProspectsInput[],
): Promise<ActionResult<{ savedCount: number; skippedCount: number }>> {
  if (leads.length === 0) {
    return fail('No leads selected to save.')
  }

  let savedCount = 0
  let skippedCount = 0
  let dbErrorCount = 0

  for (const lead of leads) {
    try {
      const normalizedWebsite = lead.website ? normalizeWebsite(lead.website) : null

      const existing = await prisma.prospect.findFirst({
        where: {
          OR: [
            { googlePlaceId: lead.googlePlaceId },
            ...(normalizedWebsite
              ? [{ website: { contains: normalizedWebsite, mode: 'insensitive' as const } }]
              : []),
          ],
        },
      })

      if (existing) {
        skippedCount++
        continue
      }

      const created = await prisma.prospect.create({
        data: {
          businessName: lead.businessName,
          industry: lead.industry,
          location: lead.location,
          website: lead.website,
          phone: lead.phone,
          address: lead.address,
          googlePlaceId: lead.googlePlaceId,
          googleMapsUrl: lead.googleMapsUrl,
          source: 'google_places',
          status: 'new',
        },
      })

      await prisma.prospectActivity.create({
        data: {
          prospectId: created.id,
          type: 'system',
          message: `Discovered via Google Places search — "${lead.industry} in ${lead.location}"`,
        },
      })

      savedCount++
    } catch {
      // A single bad row (e.g. a race-condition duplicate) shouldn't fail the whole batch.
      dbErrorCount++
    }
  }

  if (savedCount === 0 && skippedCount === 0 && dbErrorCount > 0) {
    return fail('Database error while saving prospects. Check your DATABASE_URL and try again.')
  }

  revalidatePath('/')
  revalidatePath('/pipeline')
  revalidatePath('/find-leads')

  return ok({ savedCount, skippedCount })
}

export async function updateProspectStatusAction(
  prospectId: string,
  status: ProspectStatus,
): Promise<ActionResult<null>> {
  try {
    await prisma.prospect.update({
      where: { id: prospectId },
      data: { status },
    })

    await prisma.prospectActivity.create({
      data: {
        prospectId,
        type: 'user',
        message: `Status changed to "${status.replace('_', ' ')}"`,
      },
    })

    revalidatePath('/')
    revalidatePath('/pipeline')
    revalidatePath(`/prospect/${prospectId}`)
    return ok(null)
  } catch {
    return fail('Database error while updating status.')
  }
}

export async function addProspectNoteAction(
  prospectId: string,
  note: string,
): Promise<ActionResult<InternalNote[]>> {
  if (!note.trim()) {
    return fail('Note cannot be empty.')
  }

  try {
    const prospect = await prisma.prospect.findUnique({ where: { id: prospectId } })
    if (!prospect) return fail('Prospect not found.')

    const existingNotes = Array.isArray(prospect.notes) ? (prospect.notes as unknown as InternalNote[]) : []
    const newNote: InternalNote = {
      id: `note-${Date.now()}`,
      author: 'You',
      timestamp: new Date().toISOString(),
      note: note.trim(),
    }
    const updatedNotes = [...existingNotes, newNote]

    await prisma.prospect.update({
      where: { id: prospectId },
      data: { notes: updatedNotes as unknown as object },
    })

    revalidatePath(`/prospect/${prospectId}`)
    return ok(updatedNotes)
  } catch {
    return fail('Database error while saving the note.')
  }
}
