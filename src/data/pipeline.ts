import type { ProspectStatus } from '../types'

export interface PipelineStage {
  status: ProspectStatus
  label: string
}

export const pipelineStages: PipelineStage[] = [
  { status: 'new', label: 'New' },
  { status: 'analyzed', label: 'Analyzed' },
  { status: 'contacted', label: 'Contacted' },
  { status: 'replied', label: 'Replied' },
  { status: 'audit_booked', label: 'Audit Booked' },
  { status: 'proposal_sent', label: 'Proposal Sent' },
  { status: 'won', label: 'Won' },
  { status: 'lost', label: 'Lost' },
]
