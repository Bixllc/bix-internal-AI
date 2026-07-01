import { PipelineCard } from '@/components/pipeline/PipelineCard'
import { getProspectsByStatus } from '@/lib/prospects'
import { pipelineStages } from '@/lib/pipeline'

export default async function PipelinePage() {
  const grouped = await getProspectsByStatus()

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {pipelineStages.map((stage) => {
        const stageProspects = grouped[stage.status] ?? []
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
                <PipelineCard key={p.id} prospect={p} />
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
