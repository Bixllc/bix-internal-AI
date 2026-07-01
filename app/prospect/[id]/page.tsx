import { getProspectById } from '@/lib/prospects'
import { parseJsonArray, parseJsonObject } from '@/lib/parseJson'
import { parseColdEmail } from '@/lib/coldEmail'
import type {
  AutomationOpportunity,
  CustomerJourneyStep,
  DetectedSoftware as DetectedSoftwareType,
  InternalNote,
  RecommendedSolution,
} from '@/types'

import { Card, SectionHeading, Sparkle } from '@/components/ui'
import { OverviewHeader } from '@/components/prospect/OverviewHeader'
import { AnalyzeWebsiteButton } from '@/components/prospect/AnalyzeWebsiteButton'
import { StatusSelect } from '@/components/prospect/StatusSelect'
import { ExecutiveSummary } from '@/components/prospect/ExecutiveSummary'
import { OpportunityCard } from '@/components/prospect/OpportunityCard'
import { CustomerJourney } from '@/components/prospect/CustomerJourney'
import { DetectedSoftware } from '@/components/prospect/DetectedSoftware'
import { BulletCard } from '@/components/prospect/BulletCard'
import { AutomationOpportunities } from '@/components/prospect/AutomationOpportunities'
import { RecommendedSolutions } from '@/components/prospect/RecommendedSolutions'
import { EstimatedProjectValue } from '@/components/prospect/EstimatedProjectValue'
import { ColdEmailCard } from '@/components/prospect/ColdEmailCard'
import { LinkedInMessageCard } from '@/components/prospect/LinkedInMessageCard'
import { InternalNotesCard } from '@/components/prospect/InternalNotesCard'
import { ActivityTimelineCard } from '@/components/prospect/ActivityTimelineCard'

export default async function ProspectDetailPage({ params }: { params: { id: string } }) {
  const prospect = await getProspectById(params.id)

  if (!prospect) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted">Prospect not found.</p>
      </Card>
    )
  }

  const hasReport = Boolean(prospect.executiveSummary)
  const latestJob = prospect.analysisJobs[0]
  const isRunning = latestJob?.status === 'running'

  const actions = (
    <>
      <StatusSelect prospectId={prospect.id} status={prospect.status} />
      <AnalyzeWebsiteButton
        prospectId={prospect.id}
        hasWebsite={Boolean(prospect.website)}
        alreadyAnalyzed={hasReport}
      />
    </>
  )

  return (
    <div className="flex flex-col gap-5">
      <OverviewHeader prospect={prospect} actions={actions} />

      {!hasReport && (
        <Card className="flex flex-col items-center gap-3 p-10 text-center">
          <Sparkle className="text-2xl" />
          <p className="text-sm font-medium text-ink">
            {isRunning ? 'Analysis in progress…' : 'This prospect hasn’t been analyzed yet.'}
          </p>
          <p className="max-w-sm text-sm text-muted">
            {isRunning
              ? 'BIX Scout is reading the site and drafting a full consulting report. This can take up to a minute.'
              : 'Click "Analyze Website" above to generate a full AI consulting report, opportunity score, and cold email draft.'}
          </p>
          {latestJob?.status === 'failed' && latestJob.error && (
            <p className="mt-2 max-w-sm rounded-lg bg-danger-soft px-3 py-2 text-xs text-danger">
              Last attempt failed: {latestJob.error}
            </p>
          )}
        </Card>
      )}

      {hasReport && (
        <>
          <ExecutiveSummary prospect={prospect} />
          <OpportunityCard prospect={prospect} />

          <Card className="p-6">
            <SectionHeading title="Business Overview" />
            <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-faint">Services</p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {parseJsonArray<string>(prospect.services).map((s) => (
                    <li key={s} className="text-sm text-ink">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-faint">Target Customers</p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {parseJsonArray<string>(prospect.targetCustomers).map((c) => (
                    <li key={c} className="text-sm text-ink">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <CustomerJourney steps={parseJsonArray<CustomerJourneyStep>(prospect.customerJourney)} />
          <DetectedSoftware
            software={parseJsonObject<DetectedSoftwareType>(prospect.detectedSoftware, { found: [], missing: [] })}
          />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <BulletCard title="Likely Manual Processes" items={parseJsonArray<string>(prospect.manualProcesses)} />
            <BulletCard title="Pain Points" items={parseJsonArray<string>(prospect.painPoints)} bullet="!" />
          </div>

          <AutomationOpportunities
            items={parseJsonArray<AutomationOpportunity>(prospect.automationOpportunities)}
          />

          <BulletCard title="Business Impact" items={parseJsonArray<string>(prospect.businessImpact)} bullet="↑" />

          <RecommendedSolutions items={parseJsonArray<RecommendedSolution>(prospect.recommendedBixSolutions)} />
          <EstimatedProjectValue
            oneTime={prospect.estimatedProjectValue ?? '—'}
            recurring={prospect.estimatedMonthlyRevenue ?? '—'}
          />

          {prospect.coldEmailDraft && (
            <ColdEmailCard
              prospectId={prospect.id}
              email={parseColdEmail(prospect.coldEmailDraft, prospect.businessName)}
            />
          )}
          {prospect.linkedinMessage && <LinkedInMessageCard message={prospect.linkedinMessage} />}

          <BulletCard
            title="Sales Talking Points"
            items={parseJsonArray<string>(prospect.salesTalkingPoints)}
            bullet="→"
          />
        </>
      )}

      <InternalNotesCard prospectId={prospect.id} notes={parseJsonArray<InternalNote>(prospect.notes)} />
      <ActivityTimelineCard events={prospect.activities} />
    </div>
  )
}
