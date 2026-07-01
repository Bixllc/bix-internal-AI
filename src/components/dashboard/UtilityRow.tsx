import { Card } from '../ui'
import type { SystemStatusItem } from '../../lib/systemStatus'

const statusDotClasses = {
  healthy: 'bg-success',
  degraded: 'bg-warning',
  down: 'bg-danger',
}

interface UtilityRowProps {
  scoreDistribution: { label: string; count: number }[]
  systemStatus: SystemStatusItem[]
  aiUsage: { analysesToday: number; emailsDraftedToday: number; failedToday: number }
}

export function UtilityRow({ scoreDistribution, systemStatus, aiUsage }: UtilityRowProps) {
  const maxCount = Math.max(...scoreDistribution.map((b) => b.count), 1)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card className="p-5">
        <p className="text-sm font-semibold text-ink">Score Distribution</p>
        <div className="mt-4 flex items-end gap-2">
          {scoreDistribution.map((bucket) => (
            <div key={bucket.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-20 w-full items-end">
                <div
                  className="w-full rounded-t-md bg-accent/70"
                  style={{ height: `${(bucket.count / maxCount) * 100}%` }}
                />
              </div>
              <p className="font-mono text-xs text-faint">{bucket.label}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-sm font-semibold text-ink">System Status</p>
        <div className="mt-4 flex flex-col gap-3">
          {systemStatus.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${statusDotClasses[item.status]}`} />
                <span className="text-ink">{item.label}</span>
              </div>
              <span className="text-xs text-faint">{item.detail}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-sm font-semibold text-ink">Today's AI Usage</p>
        <div className="mt-4 flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Analyses run</span>
            <span className="font-mono tabular-nums text-ink">{aiUsage.analysesToday}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Emails drafted</span>
            <span className="font-mono tabular-nums text-ink">{aiUsage.emailsDraftedToday}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Failed analyses</span>
            <span className="font-mono tabular-nums text-ink">{aiUsage.failedToday}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
