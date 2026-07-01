import type { ProspectStatus } from '../../types'
import { statusBadgeClasses, statusLabels } from '../../lib/status'
import { Badge } from './Badge'

export function StatusBadge({ status }: { status: ProspectStatus }) {
  return <Badge className={statusBadgeClasses(status)}>{statusLabels[status]}</Badge>
}
