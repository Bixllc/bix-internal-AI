'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../lib/db'
import { regenerateOutreach } from '../lib/ai'
import { ok, fail, type ActionResult } from '../lib/actionResult'
import type { ColdEmail } from '../types'
import { parseColdEmail } from '../lib/coldEmail'

export async function regenerateOutreachAction(prospectId: string): Promise<ActionResult<ColdEmail>> {
  const prospect = await prisma.prospect.findUnique({ where: { id: prospectId } })
  if (!prospect) return fail('Prospect not found.')
  if (!prospect.executiveSummary) {
    return fail('Analyze this website first before generating outreach.')
  }

  try {
    const { coldEmailDraft, linkedinMessage } = await regenerateOutreach({
      businessName: prospect.businessName,
      executiveSummary: prospect.executiveSummary,
      painPoints: Array.isArray(prospect.painPoints) ? (prospect.painPoints as string[]) : [],
      automationOpportunities: prospect.automationOpportunities,
    })

    await prisma.prospect.update({
      where: { id: prospectId },
      data: { coldEmailDraft, linkedinMessage },
    })

    await prisma.prospectActivity.create({
      data: { prospectId, type: 'ai', message: 'Cold email and LinkedIn message regenerated' },
    })

    revalidatePath(`/prospect/${prospectId}`)
    return ok(parseColdEmail(coldEmailDraft, prospect.businessName))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to regenerate outreach.'
    await prisma.prospectActivity.create({
      data: { prospectId, type: 'ai', message: `Outreach regeneration failed — ${message}` },
    })
    return fail(message)
  }
}
