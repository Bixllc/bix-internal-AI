import Link from 'next/link'
import { Card, ScoreBadge } from '../ui'
import { StatusSelect } from '../prospect/StatusSelect'
import type { Prospect } from '../../types'

export function PipelineCard({ prospect }: { prospect: Prospect }) {
  return (
    <Card className="p-4 transition-colors hover:border-accent/30">
      <Link href={`/prospect/${prospect.id}`} className="block">
        <p className="text-sm font-medium text-ink">{prospect.businessName}</p>
        <p className="mt-1 text-xs text-muted">{prospect.industry}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-faint">{prospect.location}</span>
          <ScoreBadge score={prospect.opportunityScore} />
        </div>
      </Link>
      <div className="mt-3 border-t border-border pt-3">
        <StatusSelect prospectId={prospect.id} status={prospect.status} />
      </div>
    </Card>
  )
}
