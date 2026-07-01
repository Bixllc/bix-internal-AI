import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
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

export function AppLayout() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const location = useLocation()

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

  return (
    <div className="flex h-screen w-full bg-canvas">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={resolveTitle(location.pathname)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>
      <CommandPalette open={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
    </div>
  )
}
