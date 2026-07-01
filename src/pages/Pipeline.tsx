import { useNavigate } from 'react-router-dom'
import { Card, ScoreBadge } from '../components/ui'
import { pipelineStages, prospects } from '../data'

export function Pipeline() {
  const navigate = useNavigate()

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {pipelineStages.map((stage) => {
        const stageProspects = prospects.filter((p) => p.status === stage.status)
        return (
          <div key={stage.status} className="w-72 shrink-0">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-sm font-semibold text-ink">{stage.label}</p>
              <span className="rounded-full bg-ink/5 px-2 py-0.5 font-mono text-xs tabular-nums text-faint">
                {stageProspects.length}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {stageProspects.map((p) => (
                <Card
                  key={p.id}
                  onClick={() => navigate(`/prospect/${p.id}`)}
                  className="cursor-pointer p-4 transition-colors hover:border-accent/30"
                >
                  <p className="text-sm font-medium text-ink">{p.businessName}</p>
                  <p className="mt-1 text-xs text-muted">{p.industry}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-faint">{p.location}</span>
                    <ScoreBadge score={p.opportunityScore} />
                  </div>
                </Card>
              ))}
              {stageProspects.length === 0 && (
                <p className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-faint">
                  No prospects
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
