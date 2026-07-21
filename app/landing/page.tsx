import type { Metadata } from 'next'
import BixScoutLanding from '@/components/marketing/BixScoutLanding'

export const metadata: Metadata = {
  title: 'BIX Scout — Hunt down your next clients on autopilot',
}

export default function LandingPage() {
  return <BixScoutLanding appUrl="/" />
}
