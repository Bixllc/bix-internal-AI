import { scoreBadgeClasses } from '../../lib/status'
import { Badge } from './Badge'

export function ScoreBadge({ score }: { score: number }) {
  return (
    <Badge className={`font-mono tabular-nums ${scoreBadgeClasses(score)}`}>
      {score}
    </Badge>
  )
}
