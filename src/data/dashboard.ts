export interface ActivityFeedItem {
  id: string
  label: string
  timestamp: string
  status: 'done' | 'running'
  progress?: number
}

export interface WorkflowLauncher {
  id: string
  label: string
  description: string
}

export interface ScoreBucket {
  label: string
  count: number
}

export interface SystemStatusItem {
  label: string
  status: 'healthy' | 'degraded' | 'down'
  detail: string
}

export interface Recommendation {
  id: string
  label: string
  detail: string
}

export const kpis = {
  totalProspects: 24,
  newLeads: 7,
  analyzed: 6,
  auditsBooked: 1,
  wonDeals: 2,
}

export const heroSummary = {
  analyzedToday: 12,
  readyForOutreach: 4,
  replied: 2,
  auditsToSchedule: 1,
}

export const activityFeed: ActivityFeedItem[] = [
  { id: 'act-1', label: 'Found 52 companies matching "med spas in Miami, FL"', timestamp: '2026-06-30T09:02:00Z', status: 'done' },
  { id: 'act-2', label: 'Booking systems detected across 18 prospects', timestamp: '2026-06-30T09:14:00Z', status: 'done' },
  { id: 'act-3', label: 'Manual workflows identified for Northwind Dental', timestamp: '2026-06-30T15:22:00Z', status: 'done' },
  { id: 'act-4', label: 'Opportunity report generated for Northwind Dental — score 88', timestamp: '2026-06-30T15:38:00Z', status: 'done' },
  { id: 'act-5', label: 'Cold email drafted for Ledgerline Accounting Partners', timestamp: '2026-06-30T11:05:00Z', status: 'done' },
  { id: 'act-6', label: 'Analyzing Bloom Skin & Body website…', timestamp: '2026-06-30T16:02:00Z', status: 'running', progress: 62 },
]

export const workflowLaunchers: WorkflowLauncher[] = [
  { id: 'wf-find', label: 'Find 50 New Leads', description: 'Search a new industry + location combo' },
  { id: 'wf-analyze', label: 'Analyze Selected Prospects', description: 'Run full website analysis on chosen leads' },
  { id: 'wf-outreach', label: 'Generate Outreach Campaign', description: 'Draft emails for all analyzed, uncontacted leads' },
  { id: 'wf-audit', label: 'Book Automation Audit', description: 'Schedule a free audit call with a hot prospect' },
  { id: 'wf-import', label: 'Import Prospects', description: 'Bring in a list from CSV or a manual source' },
]

export const todaysQueueIds = [
  'northwind-dental',
  'harborview-property',
  'glow-med-spa',
  'ledgerline-accounting',
  'sundance-insurance',
  'bloom-medspa',
]

export const needsAttentionIds = ['sundance-insurance', 'evercare-property', 'purebliss-medspa']

export const highOpportunityIds = ['harborview-property', 'northwind-dental', 'lakeshore-property', 'crestpoint-cpa']

export const recommendations: Recommendation[] = [
  { id: 'rec-1', label: 'Prep for tomorrow\'s audit', detail: 'Harborview Property Management — review talking points before the call.' },
  { id: 'rec-2', label: 'Send 4 outreach drafts', detail: 'Analyzed prospects are ready — review and send today for fastest replies.' },
  { id: 'rec-3', label: 'Re-engage Sundance Insurance', detail: 'No reply in 6 days — a short follow-up usually recovers ~30% of quiet threads.' },
]

export const scoreDistribution: ScoreBucket[] = [
  { label: '0–20', count: 0 },
  { label: '21–40', count: 1 },
  { label: '41–60', count: 3 },
  { label: '61–80', count: 11 },
  { label: '81–100', count: 9 },
]

export const systemStatus: SystemStatusItem[] = [
  { label: 'Google Places API', status: 'healthy', detail: 'Operational' },
  { label: 'Website Analyzer', status: 'healthy', detail: 'Operational' },
  { label: 'AI Report Generation', status: 'healthy', detail: 'Operational' },
  { label: 'Email Draft Engine', status: 'degraded', detail: 'Elevated latency' },
]

export const aiUsageToday = {
  analysesRun: 12,
  emailsDrafted: 5,
  creditsUsed: 340,
  creditsTotal: 1000,
}
