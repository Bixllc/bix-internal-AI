import type { ProspectStatus } from '../types'

export const statusLabels: Record<ProspectStatus, string> = {
  new: 'New',
  analyzed: 'Analyzed',
  email_drafted: 'Email Drafted',
  contacted: 'Contacted',
  replied: 'Replied',
  audit_booked: 'Audit Booked',
  proposal_sent: 'Proposal Sent',
  won: 'Won',
  lost: 'Lost',
}

type Tone = 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'muted'

export const statusTone: Record<ProspectStatus, Tone> = {
  new: 'muted',
  analyzed: 'info',
  email_drafted: 'info',
  contacted: 'warning',
  replied: 'accent',
  audit_booked: 'success',
  proposal_sent: 'warning',
  won: 'success',
  lost: 'danger',
}

export const toneClasses: Record<Tone, string> = {
  accent: 'bg-accent-soft text-accent',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  info: 'bg-info-soft text-info',
  muted: 'bg-ink/5 text-muted',
}

export function statusBadgeClasses(status: ProspectStatus): string {
  return toneClasses[statusTone[status]]
}

export function scoreTone(score: number): Tone {
  if (score >= 80) return 'success'
  if (score >= 60) return 'info'
  if (score >= 40) return 'warning'
  return 'danger'
}

export function scoreBadgeClasses(score: number): string {
  return toneClasses[scoreTone(score)]
}

export function ratingForScore(score: number): number {
  if (score >= 85) return 5
  if (score >= 70) return 4
  if (score >= 55) return 3
  if (score >= 40) return 2
  return 1
}

export const leadQualityTone: Record<string, Tone> = {
  Excellent: 'success',
  Good: 'info',
  Moderate: 'warning',
  Low: 'danger',
}
