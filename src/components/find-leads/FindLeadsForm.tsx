'use client'

import { useState, type FormEvent } from 'react'
import { searchLeadsAction } from '../../actions/search'
import { saveProspectsAction } from '../../actions/prospects'
import type { GooglePlaceLead } from '../../lib/googlePlaces'
import { Button, Card, SectionHeading, Skeleton, Spinner } from '../ui'
import { useResearchPhrases } from '../../lib/useResearchPhrases'

const nicheSuggestions = [
  'Med Spa',
  'Specialty Medical Practice',
  'Property Management',
  'Accounting Firm',
  'Insurance Agency',
]

interface FindLeadsFormProps {
  initialIndustry: string
  initialLocation: string
  initialMaxResults: string
}

export function FindLeadsForm({ initialIndustry, initialLocation, initialMaxResults }: FindLeadsFormProps) {
  const [industry, setIndustry] = useState(initialIndustry)
  const [location, setLocation] = useState(initialLocation)
  const [maxResults, setMaxResults] = useState(initialMaxResults || '20')

  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [results, setResults] = useState<GooglePlaceLead[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  const phrase = useResearchPhrases(isSearching)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsSearching(true)
    setHasSearched(false)
    setSearchError(null)
    setSaveMessage(null)
    setSaveError(null)

    const result = await searchLeadsAction({
      industry,
      location,
      maxResults: Number(maxResults) || 20,
    })

    setIsSearching(false)
    setHasSearched(true)

    if (!result.ok) {
      setSearchError(result.error)
      setResults([])
      return
    }

    setResults(result.data)
    setSelected(new Set(result.data.map((lead) => lead.googlePlaceId)))
  }

  function toggleSelected(placeId: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(placeId)) next.delete(placeId)
      else next.add(placeId)
      return next
    })
  }

  async function handleSave(leadsToSave: GooglePlaceLead[]) {
    if (leadsToSave.length === 0) return
    setIsSaving(true)
    setSaveMessage(null)
    setSaveError(null)

    const result = await saveProspectsAction(
      leadsToSave.map((lead) => ({ ...lead, industry, location })),
    )

    setIsSaving(false)

    if (!result.ok) {
      setSaveError(result.error)
      return
    }

    setSaveMessage(
      `Saved ${result.data.savedCount} prospect${result.data.savedCount === 1 ? '' : 's'}` +
        (result.data.skippedCount > 0 ? ` — skipped ${result.data.skippedCount} already in your pipeline.` : '.'),
    )
    setResults([])
    setSelected(new Set())
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
              max={60}
              value={maxResults}
              onChange={(e) => setMaxResults(e.target.value)}
              className="rounded-xl border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
            />
          </label>

          <div className="lg:col-span-4">
            <Button type="submit" variant="primary" disabled={isSearching || !industry.trim() || !location.trim()}>
              {isSearching && <Spinner className="h-4 w-4 text-white" />}
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
              : searchError
                ? undefined
                : hasSearched
                  ? results.length > 0
                    ? `${results.length} businesses found. Select which ones to save.`
                    : 'No businesses found for that search.'
                  : 'Run a search above to find new prospects.'
          }
        />

        {searchError && (
          <div className="mt-4 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">{searchError}</div>
        )}

        {saveMessage && (
          <div className="mt-4 rounded-lg bg-success-soft px-3 py-2 text-sm text-success">{saveMessage}</div>
        )}
        {saveError && <div className="mt-4 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">{saveError}</div>}

        {isSearching && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-accent-soft px-3 py-2 text-sm text-accent">
            <Spinner className="h-3.5 w-3.5" />
            <span>{phrase}</span>
          </div>
        )}

        {results.length > 0 && !isSearching && (
          <div className="mt-4 flex items-center gap-3">
            <Button size="sm" variant="primary" disabled={isSaving} onClick={() => handleSave(results)}>
              {isSaving && <Spinner className="h-3.5 w-3.5 text-white" />}
              Save All ({results.length})
            </Button>
            <Button
              size="sm"
              variant="secondary"
              disabled={isSaving || selected.size === 0}
              onClick={() => handleSave(results.filter((r) => selected.has(r.googlePlaceId)))}
            >
              Save Selected ({selected.size})
            </Button>
          </div>
        )}

        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wide text-faint">
                {results.length > 0 && !isSearching && <th className="w-8 pb-3" />}
                <th className="pb-3 pr-4">Company</th>
                <th className="pb-3 pr-4">Address</th>
                <th className="pb-3 pr-4">Phone</th>
                <th className="pb-3">Website</th>
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
                      <Skeleton className="h-4 w-40" />
                    </td>
                    <td className="py-3 pr-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="py-3">
                      <Skeleton className="h-4 w-28" />
                    </td>
                  </tr>
                ))}

              {!isSearching &&
                results.map((lead) => (
                  <tr key={lead.googlePlaceId} className="hover:bg-ink/[0.02]">
                    <td className="py-3 pr-4">
                      <input
                        type="checkbox"
                        checked={selected.has(lead.googlePlaceId)}
                        onChange={() => toggleSelected(lead.googlePlaceId)}
                        className="h-4 w-4 rounded border-border accent-accent"
                      />
                    </td>
                    <td className="py-3 pr-4 font-medium text-ink">{lead.businessName}</td>
                    <td className="py-3 pr-4 text-muted">{lead.address ?? '—'}</td>
                    <td className="py-3 pr-4 text-muted">{lead.phone ?? '—'}</td>
                    <td className="py-3 text-muted">{lead.website ?? '—'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
