import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkle } from '../ui'

interface CommandItem {
  id: string
  label: string
  hint?: string
  onRun: () => void
}

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  function run(fn: () => void) {
    fn()
    onClose()
  }

  const askAiCommands: CommandItem[] = [
    {
      id: 'ask-find-medspas',
      label: 'Find 50 med spas in Miami',
      hint: 'Find Leads',
      onRun: () => navigate('/find-leads?industry=Med+Spa&location=Miami%2C+FL&maxResults=50'),
    },
    {
      id: 'ask-analyze-riverside',
      label: 'Analyze Riverside Dental',
      hint: 'Prospect',
      onRun: () => navigate('/prospect/riverside-dental'),
    },
    {
      id: 'ask-generate-outreach',
      label: 'Generate outreach for high-scoring prospects',
      hint: "Today's Queue",
      onRun: () => navigate('/'),
    },
  ]

  const navigateCommands: CommandItem[] = [
    { id: 'nav-dashboard', label: 'Dashboard', onRun: () => navigate('/') },
    { id: 'nav-find-leads', label: 'Find Leads', onRun: () => navigate('/find-leads') },
    { id: 'nav-pipeline', label: 'Pipeline', onRun: () => navigate('/pipeline') },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/30 pt-32 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Sparkle />
          <input
            autoFocus
            placeholder="Ask AI or run a command…"
            className="w-full bg-transparent text-sm text-ink placeholder:text-faint focus:outline-none"
          />
          <kbd className="rounded-md border border-border px-1.5 py-0.5 font-mono text-xs text-faint">
            Esc
          </kbd>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          <CommandGroup title="Ask AI" items={askAiCommands} onRun={run} />
          <CommandGroup title="Navigate" items={navigateCommands} onRun={run} />
        </div>
      </div>
    </div>
  )
}

function CommandGroup({
  title,
  items,
  onRun,
}: {
  title: string
  items: CommandItem[]
  onRun: (fn: () => void) => void
}) {
  return (
    <div className="mb-2 last:mb-0">
      <p className="px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-faint">
        {title}
      </p>
      <div className="flex flex-col gap-0.5">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onRun(item.onRun)}
            className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-accent-soft"
          >
            <span>{item.label}</span>
            {item.hint && <span className="text-xs text-faint">{item.hint}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
