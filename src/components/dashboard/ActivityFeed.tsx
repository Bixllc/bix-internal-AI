import { Card, SectionHeading } from '../ui'
import { timeAgo } from '../../lib/format'
import { RunningJobRow } from './RunningJobRow'
import type { getRecentActivity, getRunningJobs } from '../../lib/prospects'

interface ActivityFeedProps {
  activity: Awaited<ReturnType<typeof getRecentActivity>>
  runningJobs: Awaited<ReturnType<typeof getRunningJobs>>
}

export function ActivityFeed({ activity, runningJobs }: ActivityFeedProps) {
  const isEmpty = activity.length === 0 && runningJobs.length === 0

  return (
    <Card className="p-6">
      <SectionHeading title="AI Activity" description="A live log of what BIX Scout has been doing." />
      <div className="mt-5 flex flex-col gap-4">
        {isEmpty && <p className="text-sm text-faint">No activity yet — search for leads to get started.</p>}

        {runningJobs.map((job) => (
          <RunningJobRow
            key={job.id}
            businessName={job.prospect.businessName}
            startedAt={(job.startedAt ?? job.createdAt).toISOString()}
          />
        ))}

        {activity.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <span className="mt-0.5 text-sm text-success">✓</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-ink">
                <span className="font-medium">{item.prospect.businessName}:</span> {item.message}
              </p>
              <p className="mt-0.5 text-xs text-faint">{timeAgo(item.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
