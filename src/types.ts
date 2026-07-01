import type { Prospect as PrismaProspect, ProspectStatus, ProspectActivity, AIAnalysisJob } from '@prisma/client'

export type { ProspectStatus, ProspectActivity, AIAnalysisJob }
export type Prospect = PrismaProspect

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
  businessImpact?: string
  estimatedHoursSavedPerMonth?: string
  recommendedBixService?: string
}

export interface RecommendedSolution {
  service: string
  whyItFits: string
  expectedImpact: string
  implementation: string
  estimatedPriceRange: string
}

export interface InternalNote {
  id: string
  author: string
  timestamp: string
  note: string
}

export interface ColdEmail {
  subject: string
  body: string
}

/** Shape returned by the AI analysis call, before it's persisted onto a Prospect row. */
export interface AIAnalysisReport {
  executiveSummary: string
  services: string[]
  targetCustomers: string[]
  customerJourney: CustomerJourneyStep[]
  detectedSoftware: DetectedSoftware
  manualProcesses: string[]
  painPoints: string[]
  automationOpportunities: AutomationOpportunity[]
  businessImpact: string[]
  opportunityScore: number
  leadQuality: 'Excellent' | 'Good' | 'Moderate' | 'Low'
  estimatedHoursSaved: string
  estimatedProjectValue: string
  estimatedMonthlyRevenue: string
  recommendedBixSolution: string
  recommendedBixSolutions: RecommendedSolution[]
  coldEmailDraft: string
  linkedinMessage: string
  salesTalkingPoints: string[]
}
