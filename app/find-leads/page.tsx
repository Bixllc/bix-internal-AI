import { FindLeadsForm } from '@/components/find-leads/FindLeadsForm'

interface FindLeadsPageProps {
  searchParams: { industry?: string; location?: string; maxResults?: string }
}

export default function FindLeadsPage({ searchParams }: FindLeadsPageProps) {
  return (
    <FindLeadsForm
      initialIndustry={searchParams.industry ?? ''}
      initialLocation={searchParams.location ?? ''}
      initialMaxResults={searchParams.maxResults ?? ''}
    />
  )
}
