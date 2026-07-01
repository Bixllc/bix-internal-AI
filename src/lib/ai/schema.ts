import { z } from 'zod'

export const customerJourneyStepSchema = z.object({
  step: z.string(),
  description: z.string(),
  friction: z.string().optional(),
})

export const detectedSoftwareSchema = z.object({
  found: z.array(z.string()).default([]),
  missing: z.array(z.string()).default([]),
})

export const automationOpportunitySchema = z.object({
  title: z.string(),
  description: z.string(),
  businessImpact: z.string().default(''),
  estimatedHoursSavedPerMonth: z.string().default(''),
  recommendedBixService: z.string().default(''),
})

export const recommendedSolutionSchema = z.object({
  service: z.string(),
  whyItFits: z.string(),
  expectedImpact: z.string(),
  implementation: z.string(),
  estimatedPriceRange: z.string(),
})

export const aiAnalysisReportSchema = z.object({
  executiveSummary: z.string(),
  services: z.array(z.string()).default([]),
  targetCustomers: z.array(z.string()).default([]),
  customerJourney: z.array(customerJourneyStepSchema).default([]),
  detectedSoftware: detectedSoftwareSchema,
  manualProcesses: z.array(z.string()).default([]),
  painPoints: z.array(z.string()).default([]),
  automationOpportunities: z.array(automationOpportunitySchema).default([]),
  businessImpact: z.array(z.string()).default([]),
  opportunityScore: z.number().min(1).max(100),
  leadQuality: z.enum(['Excellent', 'Good', 'Moderate', 'Low']),
  estimatedHoursSaved: z.string(),
  estimatedProjectValue: z.string(),
  estimatedMonthlyRevenue: z.string(),
  recommendedBixSolution: z.string(),
  recommendedBixSolutions: z.array(recommendedSolutionSchema).default([]),
  coldEmailDraft: z.string(),
  linkedinMessage: z.string(),
  salesTalkingPoints: z.array(z.string()).default([]),
})

export type AIAnalysisReportParsed = z.infer<typeof aiAnalysisReportSchema>

export const outreachRegenerationSchema = z.object({
  coldEmailDraft: z.string(),
  linkedinMessage: z.string(),
})

export type OutreachRegeneration = z.infer<typeof outreachRegenerationSchema>
