import { useNavigate } from 'react-router-dom'
import type { Prospect } from '../../types'
import { Button, Card, StatusBadge } from '../ui'

export function OverviewHeader({ prospect }: { prospect: Prospect }) {
  const navigate = useNavigate()

  return (
    <Card className="p-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mb-3 text-sm text-muted hover:text-ink"
          >
            ← Back
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold text-ink">{prospect.businessName}</h1>
            <StatusBadge status={prospect.status} />
          </div>
          <p className="mt-1 text-sm text-muted">
            {prospect.industry} · {prospect.location}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span>
              <span className="text-faint">Website: </span>
              {prospect.website}
            </span>
            <span>
              <span className="text-faint">Phone: </span>
              {prospect.phone}
            </span>
            <span>
              <span className="text-faint">Address: </span>
              {prospect.address}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="secondary">Update Status</Button>
          <Button variant="primary">Generate Outreach</Button>
        </div>
      </div>
    </Card>
  )
}
