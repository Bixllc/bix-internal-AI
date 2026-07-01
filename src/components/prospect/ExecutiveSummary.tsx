import type { Prospect } from '../../types'
import { Badge, Card, Sparkle } from '../ui'

export function ExecutiveSummary({ prospect }: { prospect: Prospect }) {
  const paragraphs = (prospect.executiveSummary ?? '').split(/\n+/).filter(Boolean)

  return (
    <Card className="border-accent/20 bg-gradient-to-br from-accent-soft to-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkle />
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">AI Executive Summary</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {prospect.leadQuality && (
            <Badge className="bg-success-soft text-success">Overall Opportunity: {prospect.leadQuality}</Badge>
          )}
          {prospect.estimatedProjectValue && (
            <Badge className="bg-accent-soft text-accent">Estimated Value: {prospect.estimatedProjectValue}</Badge>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed text-ink">
            {paragraph}
          </p>
        ))}
      </div>
    </Card>
  )
}
