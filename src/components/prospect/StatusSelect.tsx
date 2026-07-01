'use client'

import { useState, type ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { updateProspectStatusAction } from '../../actions/prospects'
import { pipelineStages } from '../../lib/pipeline'
import { statusLabels } from '../../lib/status'
import type { ProspectStatus } from '../../types'
import { Spinner } from '../ui'

export function StatusSelect({ prospectId, status }: { prospectId: string; status: ProspectStatus }) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const nextStatus = e.target.value as ProspectStatus
    setIsUpdating(true)
    setError(null)
    const result = await updateProspectStatusAction(prospectId, nextStatus)
    setIsUpdating(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    router.refresh()
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        {isUpdating && <Spinner className="h-3.5 w-3.5" />}
        <select
          value={status}
          onChange={handleChange}
          disabled={isUpdating}
          className="rounded-xl border border-border bg-card px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
        >
          {pipelineStages.map((stage) => (
            <option key={stage.status} value={stage.status}>
              {statusLabels[stage.status]}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="max-w-xs text-right text-xs text-danger">{error}</p>}
    </div>
  )
}
