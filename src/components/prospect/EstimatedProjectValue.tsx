import { Card, SectionHeading } from '../ui'

export function EstimatedProjectValue({ oneTime, recurring }: { oneTime: string; recurring: string }) {
  return (
    <Card className="p-6">
      <SectionHeading title="Estimated Project Value" />
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl bg-accent-soft p-4">
          <p className="text-xs font-medium text-accent">One-time</p>
          <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">{oneTime}</p>
        </div>
        <div className="rounded-xl bg-success-soft p-4">
          <p className="text-xs font-medium text-success">Recurring</p>
          <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">{recurring}</p>
        </div>
      </div>
    </Card>
  )
}
