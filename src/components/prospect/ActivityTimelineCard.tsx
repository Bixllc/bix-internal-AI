import type { ActivityEvent } from '../../types'
import { formatDateTime } from '../../lib/format'
import { Card, SectionHeading } from '../ui'

const typeDot = {
  system: 'bg-faint',
  ai: 'bg-accent',
  user: 'bg-info',
} as const

export function ActivityTimelineCard({ events }: { events: ActivityEvent[] }) {
  return (
    <Card className="p-6">
      <SectionHeading title="Activity Timeline" />
      <div className="mt-4 flex flex-col gap-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-start gap-3">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${typeDot[event.type]}`} />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-ink">{event.label}</p>
              <p className="mt-0.5 text-xs text-faint">{formatDateTime(event.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
