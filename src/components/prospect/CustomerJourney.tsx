import type { CustomerJourneyStep } from '../../types'
import { Card, SectionHeading } from '../ui'

export function CustomerJourney({ steps }: { steps: CustomerJourneyStep[] }) {
  return (
    <Card className="p-6">
      <SectionHeading title="Customer Journey" description="How customers likely discover, contact, and book today." />
      <div className="mt-5 flex flex-col gap-4">
        {steps.map((step, i) => (
          <div key={step.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-xs font-semibold text-accent">
                {i + 1}
              </div>
              {i < steps.length - 1 && <div className="mt-1 w-px flex-1 bg-border" />}
            </div>
            <div className="pb-4">
              <p className="text-sm font-medium text-ink">{step.step}</p>
              <p className="mt-1 text-sm text-muted">{step.description}</p>
              {step.friction && (
                <p className="mt-2 inline-flex items-start gap-1.5 rounded-lg bg-warning-soft px-2.5 py-1.5 text-xs text-warning">
                  Friction: {step.friction}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
