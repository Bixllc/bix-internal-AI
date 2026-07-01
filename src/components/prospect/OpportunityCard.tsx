import type { ProspectDetail } from '../../types'
import { toneClasses } from '../../lib/status'
import { Badge, Card, SectionHeading, StarRating } from '../ui'

const tierTone = {
  Excellent: toneClasses.success,
  Good: toneClasses.info,
  Moderate: toneClasses.warning,
} as const

export function OpportunityCard({ detail }: { detail: ProspectDetail }) {
  const { opportunity } = detail

  return (
    <Card className="p-6">
      <SectionHeading title="Opportunity" />
      <div className="mt-5 grid grid-cols-2 gap-6 lg:grid-cols-4">
        <div>
          <p className="text-xs font-medium text-faint">Rating</p>
          <div className="mt-2">
            <StarRating rating={opportunity.rating} />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-faint">Score</p>
          <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-ink">
            {opportunity.score}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-faint">Tier</p>
          <div className="mt-2">
            <Badge className={tierTone[opportunity.tier]}>{opportunity.tier}</Badge>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-faint">Est. Hours Saved</p>
          <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-ink">
            {opportunity.hoursSavedPerMonth}
            <span className="ml-1 text-sm font-normal text-muted">/mo</span>
          </p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-5 lg:grid-cols-2">
        <div>
          <p className="text-xs font-medium text-faint">Est. Project Value</p>
          <p className="mt-1 text-sm font-medium text-ink">{opportunity.projectValueEstimate}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-faint">Recommended BIX Solution</p>
          <p className="mt-1 text-sm font-medium text-accent">{opportunity.recommendedService}</p>
        </div>
      </div>
    </Card>
  )
}
