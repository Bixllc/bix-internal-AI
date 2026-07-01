import { LinkButton } from '../ui'

interface TopbarProps {
  title: string
  onOpenCommandPalette: () => void
}

export function Topbar({ title, onOpenCommandPalette }: TopbarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-canvas px-6">
      <h1 className="text-lg font-semibold text-ink">{title}</h1>

      <div className="flex flex-1 items-center justify-end gap-3">
        <button
          onClick={onOpenCommandPalette}
          className="flex w-full max-w-sm items-center justify-between gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-faint shadow-card transition-colors hover:text-muted"
        >
          <span>Ask AI or run a command…</span>
          <kbd className="rounded-md border border-border px-1.5 py-0.5 font-mono text-xs text-faint">⌘K</kbd>
        </button>

        <LinkButton href="/find-leads" variant="primary">
          + Find Leads
        </LinkButton>
      </div>
    </header>
  )
}
