import { Card, SectionHeading, Sparkle } from '../ui'
import { workflowLaunchers } from '../../data'

export function WorkflowLauncher() {
  return (
    <Card className="p-6">
      <SectionHeading title="Start an AI workflow" description="One click, AI handles the rest." />
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {workflowLaunchers.map((wf) => (
          <button
            key={wf.id}
            className="flex flex-col items-start gap-2 rounded-xl border border-border p-4 text-left transition-colors hover:border-accent/40 hover:bg-accent-soft"
          >
            <Sparkle />
            <p className="text-sm font-medium text-ink">{wf.label}</p>
            <p className="text-xs text-muted">{wf.description}</p>
          </button>
        ))}
      </div>
    </Card>
  )
}
