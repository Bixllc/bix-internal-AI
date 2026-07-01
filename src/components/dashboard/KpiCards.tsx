import { useNavigate } from 'react-router-dom'
import { Card } from '../ui'
import { kpis } from '../../data'

const cards = [
  { label: 'Total Prospects', value: kpis.totalProspects, to: '/pipeline' },
  { label: 'New Leads', value: kpis.newLeads, to: '/pipeline' },
  { label: 'Analyzed', value: kpis.analyzed, to: '/pipeline' },
  { label: 'Audits Booked', value: kpis.auditsBooked, to: '/pipeline' },
  { label: 'Won Deals', value: kpis.wonDeals, to: '/pipeline' },
]

export function KpiCards() {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {cards.map((card) => (
        <Card
          key={card.label}
          onClick={() => navigate(card.to)}
          className="cursor-pointer p-5 transition-colors hover:border-accent/30"
        >
          <p className="text-xs font-medium text-faint">{card.label}</p>
          <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-ink">
            {card.value}
          </p>
        </Card>
      ))}
    </div>
  )
}
