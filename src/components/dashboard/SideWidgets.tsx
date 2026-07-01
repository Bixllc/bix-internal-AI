import { useNavigate } from 'react-router-dom'
import { Card, ScoreBadge } from '../ui'
import { getProspectById, highOpportunityIds, needsAttentionIds, recommendations } from '../../data'

export function SideWidgets() {
  const navigate = useNavigate()
  const needsAttention = needsAttentionIds.map(getProspectById).filter(Boolean)
  const highOpportunity = highOpportunityIds.map(getProspectById).filter(Boolean)

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="text-sm font-semibold text-ink">Needs Attention</p>
        <div className="mt-3 flex flex-col gap-3">
          {needsAttention.map(
            (p) =>
              p && (
                <button
                  key={p.id}
                  onClick={() => navigate(`/prospect/${p.id}`)}
                  className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left hover:bg-ink/[0.03]"
                >
                  <span className="truncate text-sm text-ink">{p.businessName}</span>
                  <ScoreBadge score={p.opportunityScore} />
                </button>
              ),
          )}
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-sm font-semibold text-ink">High Opportunity</p>
        <div className="mt-3 flex flex-col gap-3">
          {highOpportunity.map(
            (p) =>
              p && (
                <button
                  key={p.id}
                  onClick={() => navigate(`/prospect/${p.id}`)}
                  className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left hover:bg-ink/[0.03]"
                >
                  <span className="truncate text-sm text-ink">{p.businessName}</span>
                  <ScoreBadge score={p.opportunityScore} />
                </button>
              ),
          )}
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-sm font-semibold text-ink">Today's Recommendations</p>
        <div className="mt-3 flex flex-col gap-3">
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
