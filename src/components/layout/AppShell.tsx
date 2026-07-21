'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { CommandPalette } from './CommandPalette'

const titles: Record<string, string> = {
  '/': 'Dashboard',
  '/find-leads': 'Find Leads',
  '/pipeline': 'Pipeline',
}

function resolveTitle(pathname: string): string {
  if (titles[pathname]) return titles[pathname]
  if (pathname.startsWith('/prospect/')) return 'Prospect Detail'
  return 'BIX Scout'
}

interface AppShellProps {
  children: ReactNode
  analysesToday: number
}

export function AppShell({ children, analysesToday }: AppShellProps) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const pathname = usePathname()
  const isMarketingRoute = pathname?.startsWith('/landing')

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandPaletteOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (isMarketingRoute) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen w-full bg-canvas">
      <Sidebar analysesToday={analysesToday} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={resolveTitle(pathname)} onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-6 py-6">{children}</div>
        </main>
      </div>
      <CommandPalette open={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
    </div>
  )
}
