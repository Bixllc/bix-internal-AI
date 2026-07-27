import type { Prospect } from '../types'

export type FitVerdict = 'target' | 'opportunity_no_budget' | 'budget_no_need' | 'weak' | 'unscored'

export interface DealFit {
  verdict: FitVerdict
  label: string
  detail: string
}

const OPPORTUNITY_FLOOR = 60
const AFFORDABILITY_FLOOR = 60

/**
 * A high opportunity score on its own is not a lead — it only says the business
 * has manual work worth automating. Pairing it with ability to pay separates
 * "worth an email" from "interesting but cannot buy".
 */
export function dealFit(prospect: Pick<Prospect, 'opportunityScore' | 'affordabilityScore'>): DealFit {
  const opportunity = prospect.opportunityScore
  const affordability = prospect.affordabilityScore

  if (opportunity == null || affordability == null) {
    return { verdict: 'unscored', label: 'Not scored', detail: 'Run the website analysis to score this prospect.' }
  }

  const hasNeed = opportunity >= OPPORTUNITY_FLOOR
  const hasBudget = affordability >= AFFORDABILITY_FLOOR

  if (hasNeed && hasBudget) {
    return { verdict: 'target', label: 'Target', detail: 'Clear automation need and the means to pay for it.' }
  }
  if (hasNeed && !hasBudget) {
    return {
      verdict: 'opportunity_no_budget',
      label: 'No budget',
      detail: 'Real automation need, but little sign they can fund a $3k+ project.',
    }
  }
  if (!hasNeed && hasBudget) {
    return {
      verdict: 'budget_no_need',
      label: 'Weak need',
      detail: 'Can likely afford it, but little manual work to automate.',
    }
  }
  return { verdict: 'weak', label: 'Low fit', detail: 'Neither a strong need nor clear ability to pay.' }
}

export const fitTone: Record<FitVerdict, 'success' | 'warning' | 'danger' | 'muted'> = {
  target: 'success',
  opportunity_no_budget: 'warning',
  budget_no_need: 'warning',
  weak: 'danger',
  unscored: 'muted',
}

export const affordabilityTierTone: Record<string, 'success' | 'info' | 'warning' | 'danger' | 'muted'> = {
  Strong: 'success',
  Likely: 'info',
  Stretch: 'warning',
  Unlikely: 'danger',
  Unknown: 'muted',
}
