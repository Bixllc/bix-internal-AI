import Link from 'next/link'
import { Card, ScoreBadge, SectionHeading, StatusBadge } from '../ui'
import { buttonBaseClasses, buttonSizeClasses, buttonVariantClasses } from '../ui/Button'
import type { QueueEntry } from '../../lib/prospects'

export function TodaysQueue({ queue }: { queue: QueueEntry[] }) {
  return (
    <Card className="p-6">
      <SectionHeading
        title="Today's Queue"
        description="AI-prioritized — the prospects most worth your attention right now."
      />
      {queue.length === 0 ? (
        <p className="mt-5 text-sm text-faint">
          Nothing queued yet. Save some prospects from Find Leads to get started.
        </p>
      ) : (
        <div className="mt-5 flex flex-col divide-y divide-border">
          {queue.map(({ prospect, surfaceReason, primaryAction }) => (
            <Link
              key={prospect.id}
              href={`/prospect/${prospect.id}`}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0 hover:bg-ink/[0.02]"
            >
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <ScoreBadge score={prospect.opportunityScore} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{prospect.businessName}</p>
                  <p className="truncate text-xs text-muted">{surfaceReason}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <StatusBadge status={prospect.status} />
                <span
                  className={`${buttonBaseClasses} ${buttonVariantClasses.primary} ${buttonSizeClasses.sm}`}
                >
                  {primaryAction}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Card>
  )
}
