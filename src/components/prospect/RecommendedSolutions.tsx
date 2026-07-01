import type { RecommendedSolution } from '../../types'
import { Card, SectionHeading } from '../ui'

export function RecommendedSolutions({ items }: { items: RecommendedSolution[] }) {
  return (
    <Card className="p-6">
      <SectionHeading title="Recommended BIX Solutions" />
      <div className="mt-5 flex flex-col gap-4">
        {items.map((solution) => (
          <div key={solution.service} className="rounded-xl border border-border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-accent">{solution.service}</p>
              <p className="font-mono text-sm font-medium tabular-nums text-ink">{solution.price}</p>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
              <div>
                <p className="text-xs font-medium text-faint">Why</p>
                <p className="mt-1 text-sm text-muted">{solution.why}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-faint">Impact</p>
                <p className="mt-1 text-sm text-muted">{solution.impact}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-faint">Implementation</p>
                <p className="mt-1 text-sm text-muted">{solution.implementation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
