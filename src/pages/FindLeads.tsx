import { useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Card, ScoreBadge, SectionHeading, Skeleton, Spinner, StatusBadge } from '../components/ui'
import { prospects } from '../data'
import { useResearchPhrases } from '../lib/useResearchPhrases'

const nicheSuggestions = [
  'Med Spa',
  'Specialty Medical Practice',
  'Property Management',
  'Accounting Firm',
  'Insurance Agency',
]

export function FindLeads() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [industry, setIndustry] = useState(searchParams.get('industry') ?? '')
  const [location, setLocation] = useState(searchParams.get('location') ?? '')
  const [maxResults, setMaxResults] = useState(searchParams.get('maxResults') ?? '20')

  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const phrase = useResearchPhrases(isSearching)

  const results = prospects.filter((p) => {
    const matchesIndustry = industry
      ? p.industry.toLowerCase().includes(industry.toLowerCase())
      : true
    const matchesLocation = location
      ? p.location.toLowerCase().includes(location.toLowerCase())
      : true
    return matchesIndustry && matchesLocation
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsSearching(true)
    setHasSearched(false)
    setTimeout(() => {
      setIsSearching(false)
      setHasSearched(true)
    }, 3600)
  }

  const skeletonCount = Math.min(Math.max(Number(maxResults) || 5, 3), 8)

  return (
    <div className="flex flex-col gap-5">
      <Card className="p-6">
        <SectionHeading
          title="Find Leads"
          description="Tell BIX Scout who to look for — it'll search, save, and prep them for you."
        />
        <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-4">
          <label className="flex flex-col gap-1.5 lg:col-span-2">
            <span className="text-xs font-medium text-muted">Industry</span>
            <input
              list="niche-suggestions"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Med Spa"
              className="rounded-xl border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
            />
            <datalist id="niche-suggestions">
              {nicheSuggestions.map((n) => (
                <option key={n} value={n} />
              ))}
            </datalist>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted">Location</span>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Miami, FL"
              className="rounded-xl border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted"># of Leads</span>
            <input
              type="number"
              min={1}
              max={100}
              value={maxResults}
              onChange={(e) => setMaxResults(e.target.value)}
              className="rounded-xl border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
            />
          </label>

          <div className="lg:col-span-4">
            <Button type="submit" variant="primary" disabled={isSearching}>
              {isSearching ? <Spinner className="h-4 w-4 text-white" /> : null}
              {isSearching ? 'Searching…' : 'Find Leads'}
            </Button>
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <SectionHeading
          title="Results"
          description={
            isSearching
              ? 'BIX Scout is researching — this usually takes a few seconds.'
              : hasSearched
                ? `${results.length} prospects found and saved.`
                : 'Run a search above to find and save new prospects.'
          }
        />

        {isSearching && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-accent-soft px-3 py-2 text-sm text-accent">
            <Spinner className="h-3.5 w-3.5" />
            <span>{phrase}</span>
          </div>
        )}

        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wide text-faint">
                <th className="pb-3 pr-4">Company</th>
                <th className="pb-3 pr-4">Location</th>
                <th className="pb-3 pr-4">Industry</th>
                <th className="pb-3 pr-4">Score</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isSearching &&
                Array.from({ length: skeletonCount }).map((_, i) => (
                  <tr key={i}>
                    <td className="py-3 pr-4">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="py-3 pr-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="py-3 pr-4">
                      <Skeleton className="h-4 w-28" />
                    </td>
                    <td className="py-3 pr-4">
                      <Skeleton className="h-5 w-10 rounded-full" />
                    </td>
                    <td className="py-3">
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </td>
                  </tr>
                ))}

              {!isSearching && hasSearched && results.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-muted">
                    No prospects matched that search.
                  </td>
                </tr>
              )}

              {!isSearching &&
                hasSearched &&
                results.slice(0, Number(maxResults) || undefined).map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => navigate(`/prospect/${p.id}`)}
                    className="cursor-pointer hover:bg-ink/[0.02]"
                  >
                    <td className="py-3 pr-4 font-medium text-ink">{p.businessName}</td>
                    <td className="py-3 pr-4 text-muted">{p.location}</td>
                    <td className="py-3 pr-4 text-muted">{p.industry}</td>
                    <td className="py-3 pr-4">
                      <ScoreBadge score={p.opportunityScore} />
                    </td>
                    <td className="py-3">
                      <StatusBadge status={p.status} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
