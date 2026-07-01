'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkle } from '../ui'

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/find-leads', label: 'Find Leads' },
  { href: '/pipeline', label: 'Pipeline' },
]

interface SidebarProps {
  analysesToday: number
}

export function Sidebar({ analysesToday }: SidebarProps) {
  const pathname = usePathname()
  const usagePct = Math.min(100, Math.round((analysesToday / 20) * 100))

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-card px-4 py-5">
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft">
          <Sparkle />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-ink">BIX Scout</p>
          <p className="text-xs text-faint">AI Prospecting</p>
        </div>
      </div>

      <nav className="mt-8 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-ink/[0.04] hover:text-ink'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3">
        <div className="rounded-xl border border-border p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted">AI usage today</p>
            <p className="font-mono text-xs tabular-nums text-faint">{analysesToday} analyses</p>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink/5">
            <div className="h-full rounded-full bg-accent" style={{ width: `${usagePct}%` }} />
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl px-2 py-2 hover:bg-ink/[0.04]">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
            S
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium text-ink">Shenesk</p>
            <p className="text-xs text-faint">admin@bixllc.net</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
