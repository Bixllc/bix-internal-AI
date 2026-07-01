import type { Metadata } from 'next'
import { AppShell } from '@/components/layout/AppShell'
import { getSidebarStats } from '@/lib/prospects'
import './globals.css'

export const metadata: Metadata = {
  title: 'BIX Scout — AI Prospecting',
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { analysesToday } = await getSidebarStats().catch(() => ({ analysesToday: 0 }))

  return (
    <html lang="en">
      <body>
        <AppShell analysesToday={analysesToday}>{children}</AppShell>
      </body>
    </html>
  )
}
