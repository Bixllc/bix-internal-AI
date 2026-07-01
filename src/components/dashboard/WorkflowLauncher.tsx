import Link from 'next/link'
import { Card, SectionHeading, Sparkle } from '../ui'

const workflowLaunchers = [
  { id: 'wf-find', label: 'Find 50 New Leads', description: 'Search a new industry + location combo', href: '/find-leads?maxResults=50' },
  { id: 'wf-analyze', label: 'Analyze Selected Prospects', description: 'Run full website analysis on chosen leads', href: '/pipeline' },
  { id: 'wf-outreach', label: 'Generate Outreach Campaign', description: 'Draft emails for all analyzed, uncontacted leads', href: '/pipeline' },
  { id: 'wf-audit', label: 'Book Automation Audit', description: 'Schedule a free audit call with a hot prospect', href: '/pipeline' },
  { id: 'wf-import', label: 'Import Prospects', description: 'Bring in a list from CSV or a manual source', href: '/find-leads' },
]

export function WorkflowLauncher() {
  return (
    <Card className="p-6">
      <SectionHeading title="Start an AI workflow" description="One click, AI handles the rest." />
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {workflowLaunchers.map((wf) => (
          <Link
            key={wf.id}
            href={wf.href}
            className="flex flex-col items-start gap-2 rounded-xl border border-border p-4 text-left transition-colors hover:border-accent/40 hover:bg-accent-soft"
          >
            <Sparkle />
            <p className="text-sm font-medium text-ink">{wf.label}</p>
            <p className="text-xs text-muted">{wf.description}</p>
          </Link>
        ))}
      </div>
    </Card>
  )
}
