import type { Prospect, AffordabilitySignal, GrowthSignal } from '../../types'
import { parseJsonArray } from '../../lib/parseJson'
import { affordabilityTierTone, dealFit, fitTone } from '../../lib/fit'
import { toneClasses } from '../../lib/status'
import { Badge, Card, SectionHeading } from '../ui'

export function AffordabilityCard({ prospect }: { prospect: Prospect }) {
  const signals = parseJsonArray<AffordabilitySignal>(prospect.affordabilitySignals)
  const growth = parseJsonArray<GrowthSignal>(prospect.growthSignals)
  const fit = dealFit(prospect)
  const tier = prospect.affordabilityTier ?? 'Unknown'
  const isUnknown = tier === 'Unknown'

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionHeading title="Ability to Pay" />
        <Badge className={toneClasses[fitTone[fit.verdict]]}>{fit.label}</Badge>
      </div>
      <p className="mt-2 text-sm text-muted">{fit.detail}</p>

      <div className="mt-5 grid grid-cols-2 gap-6 lg:grid-cols-4">
        <div>
          <p className="text-xs font-medium text-faint">Affordability</p>
          <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-ink">
            {prospect.affordabilityScore ?? '—'}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-faint">Tier</p>
          <div className="mt-2">
            <Badge className={toneClasses[affordabilityTierTone[tier] ?? 'muted']}>{tier}</Badge>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-faint">Est. Annual Revenue</p>
          <p className="mt-2 text-sm font-medium text-ink">{prospect.estimatedAnnualRevenue ?? '—'}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-faint">Est. Team Size</p>
          <p className="mt-2 text-sm font-medium text-ink">{prospect.estimatedTeamSize ?? '—'}</p>
        </div>
      </div>

      {isUnknown && (
        <p className="mt-5 rounded-lg bg-warning-soft px-3 py-2 text-xs text-warning">
          The site didn’t show enough to judge budget. Verify manually before spending time on outreach.
        </p>
      )}

      {prospect.affordabilityRationale && (
        <p className="mt-5 border-t border-border pt-5 text-sm leading-relaxed text-ink">
          {prospect.affordabilityRationale}
          {prospect.affordabilityConfidence && (
            <span className="ml-2 text-xs text-faint">({prospect.affordabilityConfidence} confidence)</span>
          )}
        </p>
      )}

      {signals.length > 0 && (
        <div className="mt-5 border-t border-border pt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-faint">Budget Signals</p>
          <ul className="mt-3 flex flex-col gap-3">
            {signals.map((s, i) => (
              <li key={`${s.signal}-${i}`} className="flex gap-3">
                <span
                  className={`mt-0.5 text-sm ${s.direction === 'negative' ? 'text-danger' : 'text-success'}`}
                  aria-hidden
                >
                  {s.direction === 'negative' ? '↓' : '↑'}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{s.signal}</p>
                  <p className="mt-0.5 text-xs text-muted">{s.evidence}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {growth.length > 0 && (
        <div className="mt-5 border-t border-border pt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-faint">Growth Signals</p>
          <ul className="mt-3 flex flex-col gap-3">
            {growth.map((g, i) => (
              <li key={`${g.signal}-${i}`} className="flex gap-3">
                <span className="mt-0.5 text-sm text-accent" aria-hidden>
                  ↗
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{g.signal}</p>
                  <p className="mt-0.5 text-xs text-muted">{g.evidence}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  )
}
