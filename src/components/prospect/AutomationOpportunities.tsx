import type { AutomationOpportunity } from '../../types'
import { Badge, Card, SectionHeading } from '../ui'

export function AutomationOpportunities({ items }: { items: AutomationOpportunity[] }) {
  return (
    <Card className="p-6">
      <SectionHeading title="Automation Opportunities" description="Ranked by likely business impact." />
      <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {items.map((item) => (
          <div key={item.title} className="rounded-xl border border-border p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-ink">{item.title}</p>
              <Badge className="shrink-0 bg-accent-soft text-accent">{item.impactTag}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
