import { useNavigate } from 'react-router-dom'
import { Button, Card, LiveDot, Sparkle } from '../ui'
import { greetingForNow } from '../../lib/format'
import { heroSummary } from '../../data'

export function Hero() {
  const navigate = useNavigate()

  return (
    <Card className="p-6">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-ink">
            Good {greetingForNow()}, Shenesk 👋
          </h1>
          <div className="mt-3 flex items-start gap-2 text-sm text-muted">
            <Sparkle className="mt-0.5" />
            <p>
              I analyzed <span className="font-medium text-ink">{heroSummary.analyzedToday} companies</span> today —{' '}
              <span className="font-medium text-ink">{heroSummary.readyForOutreach} are ready for outreach</span>,{' '}
              <span className="font-medium text-ink">{heroSummary.replied} replied</span>, and{' '}
              <span className="font-medium text-ink">{heroSummary.auditsToSchedule} audit</span> needs scheduling.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => navigate('/pipeline')}>
              Review Today's Queue
            </Button>
            <Button variant="secondary" onClick={() => navigate('/find-leads')}>
              Find New Leads
            </Button>
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
              <span className="font-mono tabular-nums text-ink">1</span>
            </div>
            <div className="flex justify-between">
              <span>Jobs queued</span>
              <span className="font-mono tabular-nums text-ink">3</span>
            </div>
            <div className="flex justify-between">
              <span>Last sync</span>
              <span className="font-mono tabular-nums text-ink">2m ago</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
