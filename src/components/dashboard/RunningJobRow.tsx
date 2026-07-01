'use client'

import { useEffect, useState } from 'react'
import { ProgressBar, Spinner } from '../ui'

const PHASES = [
  'Reading homepage…',
  'Analyzing booking flow…',
  'Detecting technology stack…',
  'Identifying manual workflows…',
  'Estimating business impact…',
  'Drafting outreach…',
]

export function RunningJobRow({ businessName, startedAt }: { businessName: string; startedAt: string }) {
  const [phaseIndex, setPhaseIndex] = useState(() => {
    const elapsed = Date.now() - new Date(startedAt).getTime()
    return Math.min(PHASES.length - 1, Math.floor(elapsed / 4000))
  })

  useEffect(() => {
    const id = setInterval(() => {
      setPhaseIndex((prev) => Math.min(PHASES.length - 1, prev + 1))
    }, 4000)
    return () => clearInterval(id)
  }, [])

  const progress = Math.round(((phaseIndex + 1) / PHASES.length) * 100)

  return (
    <div className="flex items-start gap-3">
      <Spinner className="mt-0.5 h-4 w-4" />
      <div className="min-w-0 flex-1">
        <p className="text-sm text-ink">
          Analyzing {businessName} — {PHASES[phaseIndex]}
        </p>
        <div className="mt-2 max-w-xs">
          <ProgressBar progress={progress} />
        </div>
      </div>
    </div>
  )
}
