import { prisma } from './db'
import type { Prospect, ProspectStatus } from '../types'
import { timeAgo, daysSince } from './format'

export interface QueueEntry {
  prospect: Prospect
  surfaceReason: string
  primaryAction: string
}

const primaryActionByStatus: Partial<Record<ProspectStatus, string>> = {
  replied: 'Follow Up',
  audit_booked: 'Schedule Audit',
  proposal_sent: 'Follow Up',
  analyzed: 'Generate Outreach',
  email_drafted: 'Generate Outreach',
  contacted: 'Generate Follow-up',
  new: 'Analyze Website',
}

function surfaceReasonFor(prospect: Prospect): string {
  switch (prospect.status) {
    case 'replied':
      return `Replied ${timeAgo(prospect.updatedAt)} — awaiting your response`
    case 'audit_booked':
      return 'Audit booked — prep talking points'
    case 'proposal_sent':
      return `Proposal sent ${timeAgo(prospect.updatedAt)} — check in soon`
    case 'analyzed':
    case 'email_drafted':
      return 'Analysis complete — ready for outreach'
    case 'contacted': {
      const days = daysSince(prospect.updatedAt)
      return days >= 3
        ? `No reply in ${days} days — send a follow-up`
        : `Contacted ${timeAgo(prospect.updatedAt)} — awaiting reply`
    }
    case 'new':
      return 'New lead — not yet analyzed'
    default:
      return ''
  }
}

const queueStatusRank: Partial<Record<ProspectStatus, number>> = {
  replied: 0,
  audit_booked: 1,
  proposal_sent: 2,
  analyzed: 3,
  email_drafted: 3,
  contacted: 4,
  new: 5,
}

export async function getTodaysQueue(limit = 6): Promise<QueueEntry[]> {
  const candidates = await prisma.prospect.findMany({
    where: { status: { notIn: ['won', 'lost'] } },
    take: 200,
  })

  const sorted = candidates.sort((a, b) => {
    const ra = queueStatusRank[a.status] ?? 9
    const rb = queueStatusRank[b.status] ?? 9
    if (ra !== rb) return ra - rb
    if (ra === 3) return (b.opportunityScore ?? 0) - (a.opportunityScore ?? 0)
    if (ra <= 2) return a.updatedAt.getTime() - b.updatedAt.getTime()
    return b.createdAt.getTime() - a.createdAt.getTime()
  })

  return sorted.slice(0, limit).map((prospect) => ({
    prospect,
    surfaceReason: surfaceReasonFor(prospect),
    primaryAction: primaryActionByStatus[prospect.status] ?? 'View',
  }))
}

export async function getHighOpportunity(limit = 4): Promise<Prospect[]> {
  return prisma.prospect.findMany({
    where: { opportunityScore: { not: null } },
    orderBy: { opportunityScore: 'desc' },
    take: limit,
  })
}

export async function getNeedsAttention(limit = 5): Promise<Prospect[]> {
  return prisma.prospect.findMany({
    where: { status: { in: ['replied', 'audit_booked', 'proposal_sent', 'analyzed', 'email_drafted'] } },
    orderBy: { updatedAt: 'asc' },
    take: limit,
  })
}

export async function getKpis() {
  const [totalProspects, newLeads, analyzed, auditsBooked, wonDeals] = await Promise.all([
    prisma.prospect.count(),
    prisma.prospect.count({ where: { status: 'new' } }),
    prisma.prospect.count({ where: { status: { in: ['analyzed', 'email_drafted'] } } }),
    prisma.prospect.count({ where: { status: 'audit_booked' } }),
    prisma.prospect.count({ where: { status: 'won' } }),
  ])
  return { totalProspects, newLeads, analyzed, auditsBooked, wonDeals }
}

export async function getScoreDistribution() {
  const buckets = [
    { label: '0–20', min: 0, max: 20 },
    { label: '21–40', min: 21, max: 40 },
    { label: '41–60', min: 41, max: 60 },
    { label: '61–80', min: 61, max: 80 },
    { label: '81–100', min: 81, max: 100 },
  ]
  const scored = await prisma.prospect.findMany({
    where: { opportunityScore: { not: null } },
    select: { opportunityScore: true },
  })
  return buckets.map((bucket) => ({
    label: bucket.label,
    count: scored.filter(
      (p) => (p.opportunityScore ?? -1) >= bucket.min && (p.opportunityScore ?? -1) <= bucket.max,
    ).length,
  }))
}

export async function getRecentActivity(limit = 8) {
  return prisma.prospectActivity.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: { prospect: { select: { businessName: true } } },
  })
}

export async function getRunningJobs() {
  return prisma.aIAnalysisJob.findMany({
    where: { status: 'running' },
    include: { prospect: { select: { businessName: true } } },
    orderBy: { startedAt: 'asc' },
  })
}

export async function getQueuedJobCount() {
  return prisma.aIAnalysisJob.count({ where: { status: 'queued' } })
}

export async function getProspectsByStatus(): Promise<Record<ProspectStatus, Prospect[]>> {
  const all = await prisma.prospect.findMany({ orderBy: { opportunityScore: 'desc' } })
  const grouped: Record<string, Prospect[]> = {}
  for (const prospect of all) {
    grouped[prospect.status] ??= []
    grouped[prospect.status].push(prospect)
  }
  return grouped as Record<ProspectStatus, Prospect[]>
}

export async function getHeroSummary() {
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const [analyzedToday, readyForOutreach, replied, auditsBooked] = await Promise.all([
    prisma.aIAnalysisJob.count({ where: { status: 'completed', completedAt: { gte: startOfDay } } }),
    prisma.prospect.count({ where: { status: { in: ['analyzed', 'email_drafted'] } } }),
    prisma.prospect.count({ where: { status: 'replied' } }),
    prisma.prospect.count({ where: { status: 'audit_booked' } }),
  ])

  return { analyzedToday, readyForOutreach, replied, auditsBooked }
}

export interface Recommendation {
  id: string
  label: string
  detail: string
}

export async function getRecommendations(limit = 3): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = []

  const nextAudit = await prisma.prospect.findFirst({
    where: { status: 'audit_booked' },
    orderBy: { updatedAt: 'asc' },
  })
  if (nextAudit) {
    recommendations.push({
      id: `rec-audit-${nextAudit.id}`,
      label: 'Prep for your next audit',
      detail: `${nextAudit.businessName} — review talking points before the call.`,
    })
  }

  const readyForOutreach = await prisma.prospect.count({ where: { status: { in: ['analyzed', 'email_drafted'] } } })
  if (readyForOutreach > 0) {
    recommendations.push({
      id: 'rec-outreach',
      label: `Send ${readyForOutreach} outreach draft${readyForOutreach === 1 ? '' : 's'}`,
      detail: 'Analyzed prospects are ready — review and send today for fastest replies.',
    })
  }

  const staleContacted = await prisma.prospect.findFirst({
    where: { status: 'contacted', updatedAt: { lte: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) } },
    orderBy: { updatedAt: 'asc' },
  })
  if (staleContacted) {
    recommendations.push({
      id: `rec-followup-${staleContacted.id}`,
      label: `Re-engage ${staleContacted.businessName}`,
      detail: 'No reply in a few days — a short follow-up often recovers quiet threads.',
    })
  }

  return recommendations.slice(0, limit)
}

export async function getSidebarStats() {
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const [analysesToday, emailsDraftedToday, failedToday] = await Promise.all([
    prisma.aIAnalysisJob.count({
      where: { status: 'completed', completedAt: { gte: startOfDay } },
    }),
    prisma.prospect.count({
      where: { coldEmailDraft: { not: null }, updatedAt: { gte: startOfDay } },
    }),
    prisma.aIAnalysisJob.count({
      where: { status: 'failed', completedAt: { gte: startOfDay } },
    }),
  ])

  return { analysesToday, emailsDraftedToday, failedToday }
}

export async function getProspectById(id: string) {
  return prisma.prospect.findUnique({
    where: { id },
    include: {
      activities: { orderBy: { createdAt: 'desc' } },
      analysisJobs: { orderBy: { createdAt: 'desc' }, take: 1 },
    },
  })
}
