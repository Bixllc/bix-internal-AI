import { useState } from 'react'
import type { ColdEmail } from '../../types'
import { Button, Card, SectionHeading, Spinner } from '../ui'

export function ColdEmailCard({ email }: { email: ColdEmail }) {
  const [isGenerating, setIsGenerating] = useState(false)

  function handleRegenerate() {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 1800)
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
            <p className="text-sm font-medium text-ink">Subject: {email.subject}</p>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">
              {email.body}
            </p>
          </>
        )}
      </div>
    </Card>
  )
}
