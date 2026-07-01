'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ColdEmail } from '../../types'
import { regenerateOutreachAction } from '../../actions/regenerateOutreach'
import { Button, Card, SectionHeading, Spinner } from '../ui'

export function ColdEmailCard({ prospectId, email }: { prospectId: string; email: ColdEmail }) {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [current, setCurrent] = useState(email)
  const [error, setError] = useState<string | null>(null)

  async function handleRegenerate() {
    setIsGenerating(true)
    setError(null)
    const result = await regenerateOutreachAction(prospectId)
    setIsGenerating(false)

    if (!result.ok) {
      setError(result.error)
      return
    }
    setCurrent(result.data)
    router.refresh()
  }

  return (
    <Card className="p-6">
      <SectionHeading
        title="Cold Email"
        description="Short, specific, and focused on a free automation audit."
        action={
          <Button size="sm" variant="secondary" onClick={handleRegenerate} disabled={isGenerating}>
            {isGenerating && <Spinner className="h-3.5 w-3.5" />}
            {isGenerating ? 'Generating…' : 'Regenerate'}
          </Button>
        }
      />
      {error && <p className="mt-3 text-xs text-danger">{error}</p>}
      <div className="mt-5 rounded-xl border border-border bg-canvas p-4">
        {isGenerating ? (
          <div className="flex flex-col gap-2">
            <div className="h-4 w-2/3 animate-pulse rounded bg-ink/[0.06]" />
            <div className="h-3 w-full animate-pulse rounded bg-ink/[0.06]" />
            <div className="h-3 w-full animate-pulse rounded bg-ink/[0.06]" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-ink/[0.06]" />
          </div>
        ) : (
          <>
            <p className="text-sm font-medium text-ink">Subject: {current.subject}</p>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">{current.body}</p>
          </>
        )}
      </div>
    </Card>
  )
}
