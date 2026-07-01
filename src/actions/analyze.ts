'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../lib/db'
import { fetchWebsiteContent } from '../lib/websiteFetcher'
import { generateAnalysis } from '../lib/ai'
import { ok, fail, type ActionResult } from '../lib/actionResult'

export async function analyzeWebsiteAction(prospectId: string): Promise<ActionResult<null>> {
  const prospect = await prisma.prospect.findUnique({ where: { id: prospectId } })
  if (!prospect) return fail('Prospect not found.')
  if (!prospect.website) {
    return fail('This prospect has no website on file. Add a website before running analysis.')
  }

  const job = await prisma.aIAnalysisJob.create({
    data: { prospectId, status: 'running', startedAt: new Date() },
  })

  await prisma.prospectActivity.create({
    data: { prospectId, type: 'ai', message: 'Website analysis started' },
  })

  try {
    const pages = await fetchWebsiteContent(prospect.website)

    const report = await generateAnalysis({
      businessName: prospect.businessName,
      industry: prospect.industry,
      location: prospect.location,
      pages,
    })

    const hasColdEmail = report.coldEmailDraft.trim().length > 0

    await prisma.prospect.update({
      where: { id: prospectId },
      data: {
        status: hasColdEmail ? 'email_drafted' : 'analyzed',
        opportunityScore: report.opportunityScore,
        leadQuality: report.leadQuality,
        estimatedHoursSaved: report.estimatedHoursSaved,
        estimatedProjectValue: report.estimatedProjectValue,
        estimatedMonthlyRevenue: report.estimatedMonthlyRevenue,
        recommendedBixSolution: report.recommendedBixSolution,
        executiveSummary: report.executiveSummary,
        services: report.services,
        targetCustomers: report.targetCustomers,
        customerJourney: report.customerJourney,
        detectedSoftware: report.detectedSoftware,
        manualProcesses: report.manualProcesses,
        painPoints: report.painPoints,
        automationOpportunities: report.automationOpportunities,
        businessImpact: report.businessImpact,
        recommendedBixSolutions: report.recommendedBixSolutions,
        coldEmailDraft: report.coldEmailDraft,
        linkedinMessage: report.linkedinMessage,
        salesTalkingPoints: report.salesTalkingPoints,
      },
    })

    await prisma.aIAnalysisJob.update({
      where: { id: job.id },
      data: { status: 'completed', completedAt: new Date() },
    })

    await prisma.prospectActivity.create({
      data: {
        prospectId,
        type: 'ai',
        message: `AI report generated — score ${report.opportunityScore} (${report.leadQuality})`,
      },
    })

    revalidatePath('/')
    revalidatePath('/pipeline')
    revalidatePath(`/prospect/${prospectId}`)

    return ok(null)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Website analysis failed unexpectedly.'

    await prisma.aIAnalysisJob.update({
      where: { id: job.id },
      data: { status: 'failed', completedAt: new Date(), error: message },
    })

    await prisma.prospectActivity.create({
      data: { prospectId, type: 'ai', message: `Website analysis failed — ${message}` },
    })

    revalidatePath(`/prospect/${prospectId}`)
    revalidatePath('/')

    return fail(message)
  }
}
