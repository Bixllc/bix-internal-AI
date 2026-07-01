'use client'

import { useEffect } from 'react'
import { Button, Card } from '@/components/ui'

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Card className="flex flex-col items-center gap-3 p-10 text-center">
      <p className="text-sm font-medium text-ink">Something went wrong loading this page.</p>
      <p className="max-w-md text-sm text-muted">
        {error.message || 'An unexpected error occurred. This is often a database connection issue — check your DATABASE_URL.'}
      </p>
      <Button variant="primary" onClick={reset} className="mt-2">
        Try again
      </Button>
    </Card>
  )
}
