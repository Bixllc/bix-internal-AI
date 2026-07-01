import Link from 'next/link'
import { Card, ScoreBadge } from '../ui'
import type { Prospect } from '../../types'
import type { Recommendation } from '../../lib/prospects'

interface SideWidgetsProps {
  needsAttention: Prospect[]
  highOpportunity: Prospect[]
  recommendations: Recommendation[]
}

export function SideWidgets({ needsAttention, highOpportunity, recommendations }: SideWidgetsProps) {
  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="text-sm font-semibold text-ink">Needs Attention</p>
        <div className="mt-3 flex flex-col gap-3">
          {needsAttention.length === 0 && <p className="text-xs text-faint">Nothing needs attention right now.</p>}
          {needsAttention.map((p) => (
            <Link
              key={p.id}
              href={`/prospect/${p.id}`}
              className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left hover:bg-ink/[0.03]"
            >
              <span className="truncate text-sm text-ink">{p.businessName}</span>
              <ScoreBadge score={p.opportunityScore} />
            </Link>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-sm font-semibold text-ink">High Opportunity</p>
        <div className="mt-3 flex flex-col gap-3">
          {highOpportunity.length === 0 && <p className="text-xs text-faint">No scored prospects yet.</p>}
          {highOpportunity.map((p) => (
            <Link
              key={p.id}
              href={`/prospect/${p.id}`}
              className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left hover:bg-ink/[0.03]"
            >
              <span className="truncate text-sm text-ink">{p.businessName}</span>
              <ScoreBadge score={p.opportunityScore} />
            </Link>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-sm font-semibold text-ink">Today's Recommendations</p>
        <div className="mt-3 flex flex-col gap-3">
          {recommendations.length === 0 && <p className="text-xs text-faint">All caught up.</p>}
          {recommendations.map((rec) => (
            <div key={rec.id} className="rounded-lg bg-accent-soft p-3">
              <p className="text-sm font-medium text-ink">{rec.label}</p>
              <p className="mt-0.5 text-xs text-muted">{rec.detail}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
