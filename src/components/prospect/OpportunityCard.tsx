import type { Prospect } from '../../types'
import { leadQualityTone, ratingForScore, toneClasses } from '../../lib/status'
import { Badge, Card, SectionHeading, StarRating } from '../ui'

export function OpportunityCard({ prospect }: { prospect: Prospect }) {
  const score = prospect.opportunityScore ?? 0

  return (
    <Card className="p-6">
      <SectionHeading title="Opportunity" />
      <div className="mt-5 grid grid-cols-2 gap-6 lg:grid-cols-4">
        <div>
          <p className="text-xs font-medium text-faint">Rating</p>
          <div className="mt-2">
            <StarRating rating={ratingForScore(score)} />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-faint">Score</p>
          <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-ink">{score}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-faint">Lead Quality</p>
          <div className="mt-2">
            {prospect.leadQuality && (
              <Badge className={toneClasses[leadQualityTone[prospect.leadQuality] ?? 'muted']}>
                {prospect.leadQuality}
              </Badge>
            )}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-faint">Est. Hours Saved</p>
          <p className="mt-2 text-lg font-semibold text-ink">{prospect.estimatedHoursSaved ?? '—'}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-5 lg:grid-cols-2">
        <div>
          <p className="text-xs font-medium text-faint">Est. Project Value</p>
          <p className="mt-1 text-sm font-medium text-ink">{prospect.estimatedProjectValue ?? '—'}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-faint">Recommended BIX Solution</p>
          <p className="mt-1 text-sm font-medium text-accent">{prospect.recommendedBixSolution ?? '—'}</p>
        </div>
      </div>
    </Card>
  )
}
