import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { Hero } from '@/components/dashboard/Hero'
import { KpiCards } from '@/components/dashboard/KpiCards'
import { SideWidgets } from '@/components/dashboard/SideWidgets'
import { TodaysQueue } from '@/components/dashboard/TodaysQueue'
import { UtilityRow } from '@/components/dashboard/UtilityRow'
import { WorkflowLauncher } from '@/components/dashboard/WorkflowLauncher'
import { getSystemStatus } from '@/lib/systemStatus'
import {
  getHeroSummary,
  getHighOpportunity,
  getKpis,
  getNeedsAttention,
  getQueuedJobCount,
  getRecentActivity,
  getRecommendations,
  getRunningJobs,
  getScoreDistribution,
  getSidebarStats,
  getTodaysQueue,
} from '@/lib/prospects'

export default async function DashboardPage() {
  const [
    heroSummary,
    queue,
    kpis,
    activity,
    runningJobs,
    queuedJobCount,
    needsAttention,
    highOpportunity,
    recommendations,
    scoreDistribution,
    sidebarStats,
  ] = await Promise.all([
    getHeroSummary(),
    getTodaysQueue(6),
    getKpis(),
    getRecentActivity(6),
    getRunningJobs(),
    getQueuedJobCount(),
    getNeedsAttention(5),
    getHighOpportunity(4),
    getRecommendations(3),
    getScoreDistribution(),
    getSidebarStats(),
  ])

  return (
    <div className="flex flex-col gap-5">
      <Hero summary={heroSummary} jobsRunning={runningJobs.length} jobsQueued={queuedJobCount} />
      <TodaysQueue queue={queue} />
      <WorkflowLauncher />
      <KpiCards kpis={kpis} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed activity={activity} runningJobs={runningJobs} />
        </div>
        <SideWidgets
          needsAttention={needsAttention}
          highOpportunity={highOpportunity}
          recommendations={recommendations}
        />
      </div>
      <UtilityRow scoreDistribution={scoreDistribution} systemStatus={getSystemStatus()} aiUsage={sidebarStats} />
    </div>
  )
}
