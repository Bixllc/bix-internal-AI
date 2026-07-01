import type { ProspectDetail } from '../../types'
import { Badge, Card, Sparkle } from '../ui'

export function ExecutiveSummary({ detail }: { detail: ProspectDetail }) {
  return (
    <Card className="border-accent/20 bg-gradient-to-br from-accent-soft to-card p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkle />
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            AI Executive Summary
          </p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-success-soft text-success">
            Overall Opportunity: {detail.opportunity.tier}
          </Badge>
          <Badge className="bg-accent-soft text-accent">
            Estimated Value: {detail.estimatedValueRange}
          </Badge>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {detail.executiveSummary.map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed text-ink">
            {paragraph}
          </p>
        ))}
      </div>
    </Card>
  )
}
