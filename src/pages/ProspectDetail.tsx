import { useParams } from 'react-router-dom'
import { getProspectById, northwindDentalDetail, buildDetailFromProspect } from '../data'
import { Card, SectionHeading } from '../components/ui'
import { OverviewHeader } from '../components/prospect/OverviewHeader'
import { ExecutiveSummary } from '../components/prospect/ExecutiveSummary'
import { OpportunityCard } from '../components/prospect/OpportunityCard'
import { CustomerJourney } from '../components/prospect/CustomerJourney'
import { DetectedSoftware } from '../components/prospect/DetectedSoftware'
import { BulletCard } from '../components/prospect/BulletCard'
import { AutomationOpportunities } from '../components/prospect/AutomationOpportunities'
import { RecommendedSolutions } from '../components/prospect/RecommendedSolutions'
import { EstimatedProjectValue } from '../components/prospect/EstimatedProjectValue'
import { ColdEmailCard } from '../components/prospect/ColdEmailCard'
import { LinkedInMessageCard } from '../components/prospect/LinkedInMessageCard'
import { InternalNotesCard } from '../components/prospect/InternalNotesCard'
import { ActivityTimelineCard } from '../components/prospect/ActivityTimelineCard'

export function ProspectDetail() {
  const { id } = useParams<{ id: string }>()
  const prospect = id ? getProspectById(id) : undefined

  if (!prospect) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted">Prospect not found.</p>
      </Card>
    )
  }

  const detail = id === 'northwind-dental' ? northwindDentalDetail : buildDetailFromProspect(prospect)

  return (
    <div className="flex flex-col gap-5">
      <OverviewHeader prospect={detail} />
      <ExecutiveSummary detail={detail} />
      <OpportunityCard detail={detail} />

      <Card className="p-6">
        <SectionHeading title="Business Overview" />
        <p className="mt-4 text-sm leading-relaxed text-muted">{detail.businessOverview}</p>
      </Card>

      <CustomerJourney steps={detail.customerJourney} />
      <DetectedSoftware software={detail.detectedSoftware} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <BulletCard title="Likely Manual Processes" items={detail.likelyManualProcesses} />
        <BulletCard title="Pain Points" items={detail.painPoints} bullet="!" />
      </div>

      <AutomationOpportunities items={detail.automationOpportunities} />

      <BulletCard title="Business Impact" items={detail.businessImpact} bullet="↑" />

      <RecommendedSolutions items={detail.recommendedSolutions} />
      <EstimatedProjectValue
        oneTime={detail.estimatedProjectValue.oneTime}
        recurring={detail.estimatedProjectValue.recurring}
      />

      <ColdEmailCard email={detail.coldEmail} />
      <LinkedInMessageCard message={detail.linkedinMessage} />

      <BulletCard title="Sales Talking Points" items={detail.salesTalkingPoints} bullet="→" />

      <InternalNotesCard notes={detail.internalNotes} />
      <ActivityTimelineCard events={detail.activityTimeline} />
    </div>
  )
}
