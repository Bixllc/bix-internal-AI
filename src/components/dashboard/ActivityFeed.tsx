import { Card, ProgressBar, SectionHeading, Spinner } from '../ui'
import { activityFeed } from '../../data'
import { timeAgo } from '../../lib/format'

export function ActivityFeed() {
  return (
    <Card className="p-6">
      <SectionHeading title="AI Activity" description="A live log of what BIX Scout has been doing." />
      <div className="mt-5 flex flex-col gap-4">
        {activityFeed.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            {item.status === 'running' ? (
              <Spinner className="mt-0.5 h-4 w-4" />
            ) : (
              <span className="mt-0.5 text-sm text-success">✓</span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm text-ink">{item.label}</p>
              {item.status === 'running' ? (
                <div className="mt-2 max-w-xs">
                  <ProgressBar progress={item.progress} />
                </div>
              ) : (
                <p className="mt-0.5 text-xs text-faint">{timeAgo(item.timestamp)}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
