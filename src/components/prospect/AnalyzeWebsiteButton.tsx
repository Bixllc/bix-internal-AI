'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { analyzeWebsiteAction } from '../../actions/analyze'
import { Button, Spinner } from '../ui'
import { useResearchPhrases } from '../../lib/useResearchPhrases'

interface AnalyzeWebsiteButtonProps {
  prospectId: string
  hasWebsite: boolean
  alreadyAnalyzed: boolean
}

export function AnalyzeWebsiteButton({ prospectId, hasWebsite, alreadyAnalyzed }: AnalyzeWebsiteButtonProps) {
  const router = useRouter()
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const phrase = useResearchPhrases(isRunning, 2200)

  async function handleClick() {
    setIsRunning(true)
    setError(null)
    const result = await analyzeWebsiteAction(prospectId)
    setIsRunning(false)

    if (!result.ok) {
      setError(result.error)
      return
    }
    router.refresh()
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <Button variant="primary" onClick={handleClick} disabled={!hasWebsite || isRunning}>
        {isRunning && <Spinner className="h-4 w-4 text-white" />}
        {isRunning ? phrase : alreadyAnalyzed ? 'Re-analyze Website' : 'Analyze Website'}
      </Button>
      {!hasWebsite && <p className="text-xs text-faint">No website on file — add one to analyze.</p>}
      {error && <p className="max-w-xs text-right text-xs text-danger">{error}</p>}
    </div>
  )
}
