export type ProspectStatus =
  | 'new'
  | 'analyzed'
  | 'contacted'
  | 'replied'
  | 'audit_booked'
  | 'proposal_sent'
  | 'won'
  | 'lost'

export type BixService =
  | 'Website Redesign'
  | 'BIX Booking'
  | 'BIX Client Portal'
  | 'Workflow Automation'
  | 'AI Automation'
  | 'Custom Software'

export type OpportunityTier = 'Excellent' | 'Good' | 'Moderate'

export interface Prospect {
  id: string
  businessName: string
  industry: string
  location: string
  website: string
  phone: string
  address: string
  source: string
  status: ProspectStatus
  opportunityScore: number
  createdAt: string
  updatedAt: string
  surfaceReason?: string
  primaryAction?: string
}

export interface CustomerJourneyStep {
  step: string
  description: string
  friction?: string
}

export interface DetectedSoftware {
  found: string[]
  missing: string[]
}

export interface AutomationOpportunity {
  title: string
  description: string
  impactTag: string
}

export interface RecommendedSolution {
  service: BixService
  why: string
  impact: string
  implementation: string
  price: string
}

export interface OpportunitySummary {
  rating: number
  score: number
  tier: OpportunityTier
  hoursSavedPerMonth: number
  projectValueEstimate: string
  recommendedService: BixService
}

export interface ColdEmail {
  subject: string
  body: string
}

export interface ActivityEvent {
  id: string
  label: string
  timestamp: string
  type: 'system' | 'user' | 'ai'
}

export interface InternalNote {
  id: string
  author: string
  timestamp: string
  note: string
}

export interface ProspectDetail extends Prospect {
  estimatedValueRange: string
  opportunity: OpportunitySummary
  executiveSummary: string[]
  businessOverview: string
  customerJourney: CustomerJourneyStep[]
  detectedSoftware: DetectedSoftware
  likelyManualProcesses: string[]
  painPoints: string[]
  automationOpportunities: AutomationOpportunity[]
  businessImpact: string[]
  recommendedSolutions: RecommendedSolution[]
  estimatedProjectValue: { oneTime: string; recurring: string }
  coldEmail: ColdEmail
  linkedinMessage: string
  salesTalkingPoints: string[]
  internalNotes: InternalNote[]
  activityTimeline: ActivityEvent[]
}
