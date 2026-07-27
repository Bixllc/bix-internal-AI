import Link from 'next/link'
import { Badge, Card, ScoreBadge } from '../ui'
import { StatusSelect } from '../prospect/StatusSelect'
import { dealFit, fitTone } from '../../lib/fit'
import { toneClasses } from '../../lib/status'
import type { Prospect } from '../../types'

export function PipelineCard({ prospect }: { prospect: Prospect }) {
  const fit = dealFit(prospect)

  return (
    <Card className="p-4 transition-colors hover:border-accent/30">
      <Link href={`/prospect/${prospect.id}`} className="block">
        <p className="text-sm font-medium text-ink">{prospect.businessName}</p>
        <p className="mt-1 text-xs text-muted">{prospect.industry}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-faint">{prospect.location}</span>
          <div className="flex items-center gap-1.5">
            {fit.verdict !== 'unscored' && (
              <Badge className={toneClasses[fitTone[fit.verdict]]}>{fit.label}</Badge>
            )}
            <ScoreBadge score={prospect.opportunityScore} />
          </div>
        </div>
      </Link>
      <div className="mt-3 border-t border-border pt-3">
        <StatusSelect prospectId={prospect.id} status={prospect.status} />
      </div>
    </Card>
  )
}
