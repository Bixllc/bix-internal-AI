import Link from 'next/link'
import { Card } from '../ui'
import type { getKpis } from '../../lib/prospects'

interface KpiCardsProps {
  kpis: Awaited<ReturnType<typeof getKpis>>
}

export function KpiCards({ kpis }: KpiCardsProps) {
  const cards = [
    { label: 'Total Prospects', value: kpis.totalProspects },
    { label: 'New Leads', value: kpis.newLeads },
    { label: 'Analyzed', value: kpis.analyzed },
    { label: 'Audits Booked', value: kpis.auditsBooked },
    { label: 'Won Deals', value: kpis.wonDeals },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {cards.map((card) => (
        <Link key={card.label} href="/pipeline" className="block">
          <Card className="cursor-pointer p-5 transition-colors hover:border-accent/30">
            <p className="text-xs font-medium text-faint">{card.label}</p>
            <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-ink">{card.value}</p>
          </Card>
        </Link>
      ))}
    </div>
  )
}
