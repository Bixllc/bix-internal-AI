import { Card, LinkButton, LiveDot, Sparkle } from '../ui'
import { greetingForNow } from '../../lib/format'
import type { getHeroSummary } from '../../lib/prospects'

interface HeroProps {
  summary: Awaited<ReturnType<typeof getHeroSummary>>
  jobsRunning: number
  jobsQueued: number
}

export function Hero({ summary, jobsRunning, jobsQueued }: HeroProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Good {greetingForNow()}, Shenesk 👋</h1>
          <div className="mt-3 flex items-start gap-2 text-sm text-muted">
            <Sparkle className="mt-0.5" />
            <p>
              I analyzed <span className="font-medium text-ink">{summary.analyzedToday} companies</span> today —{' '}
              <span className="font-medium text-ink">{summary.readyForOutreach} are ready for outreach</span>,{' '}
              <span className="font-medium text-ink">{summary.replied} replied</span>, and{' '}
              <span className="font-medium text-ink">{summary.auditsBooked} audit(s)</span> booked.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <LinkButton href="/pipeline" variant="primary">
              Review Today's Queue
            </LinkButton>
            <LinkButton href="/find-leads" variant="secondary">
              Find New Leads
            </LinkButton>
          </div>
        </div>

        <div className="w-full shrink-0 rounded-xl border border-border bg-canvas p-4 lg:w-64">
          <div className="flex items-center gap-2">
            <LiveDot />
            <p className="text-sm font-medium text-ink">AI is active</p>
          </div>
          <div className="mt-3 space-y-1.5 text-sm text-muted">
            <div className="flex justify-between">
              <span>Jobs running</span>
              <span className="font-mono tabular-nums text-ink">{jobsRunning}</span>
            </div>
            <div className="flex justify-between">
              <span>Jobs queued</span>
              <span className="font-mono tabular-nums text-ink">{jobsQueued}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
