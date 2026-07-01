import { ActivityFeed } from '../components/dashboard/ActivityFeed'
import { Hero } from '../components/dashboard/Hero'
import { KpiCards } from '../components/dashboard/KpiCards'
import { SideWidgets } from '../components/dashboard/SideWidgets'
import { TodaysQueue } from '../components/dashboard/TodaysQueue'
import { UtilityRow } from '../components/dashboard/UtilityRow'
import { WorkflowLauncher } from '../components/dashboard/WorkflowLauncher'

export function Dashboard() {
  return (
    <div className="flex flex-col gap-5">
      <Hero />
      <TodaysQueue />
      <WorkflowLauncher />
      <KpiCards />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <SideWidgets />
      </div>
      <UtilityRow />
    </div>
  )
}
