import { useNavigate } from 'react-router-dom'
import { Button, Card, ScoreBadge, SectionHeading, StatusBadge } from '../ui'
import { getProspectById, todaysQueueIds } from '../../data'

export function TodaysQueue() {
  const navigate = useNavigate()
  const queue = todaysQueueIds
    .map(getProspectById)
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .sort((a, b) => b.opportunityScore - a.opportunityScore)

  return (
    <Card className="p-6">
      <SectionHeading
        title="Today's Queue"
        description="AI-prioritized — the prospects most worth your attention right now."
      />
      <div className="mt-5 flex flex-col divide-y divide-border">
        {queue.map((prospect) => (
          <div
            key={prospect.id}
            onClick={() => navigate(`/prospect/${prospect.id}`)}
            className="flex cursor-pointer items-center justify-between gap-4 py-4 first:pt-0 last:pb-0 hover:bg-ink/[0.02]"
          >
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <ScoreBadge score={prospect.opportunityScore} />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{prospect.businessName}</p>
                <p className="truncate text-xs text-muted">{prospect.surfaceReason}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <StatusBadge status={prospect.status} />
              {prospect.primaryAction && (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/prospect/${prospect.id}`)
                  }}
                >
                  {prospect.primaryAction}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
