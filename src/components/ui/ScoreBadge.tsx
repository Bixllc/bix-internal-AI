import { scoreBadgeClasses, toneClasses } from '../../lib/status'
import { Badge } from './Badge'

export function ScoreBadge({ score }: { score: number | null | undefined }) {
  if (score === null || score === undefined) {
    return <Badge className={`font-mono tabular-nums ${toneClasses.muted}`}>—</Badge>
  }
  return <Badge className={`font-mono tabular-nums ${scoreBadgeClasses(score)}`}>{score}</Badge>
}
