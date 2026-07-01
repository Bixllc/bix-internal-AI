'use client'

import { useState } from 'react'
import type { InternalNote } from '../../types'
import { formatDateTime } from '../../lib/format'
import { addProspectNoteAction } from '../../actions/prospects'
import { Button, Card, SectionHeading, Spinner } from '../ui'

export function InternalNotesCard({ prospectId, notes: initialNotes }: { prospectId: string; notes: InternalNote[] }) {
  const [notes, setNotes] = useState(initialNotes)
  const [draft, setDraft] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleAdd() {
    if (!draft.trim()) return
    setIsSaving(true)
    setError(null)
    const result = await addProspectNoteAction(prospectId, draft.trim())
    setIsSaving(false)

    if (!result.ok) {
      setError(result.error)
      return
    }
    setNotes(result.data)
    setDraft('')
  }

  return (
    <Card className="p-6">
      <SectionHeading title="Internal Notes" description="Only visible to your team." />
      <div className="mt-4 flex flex-col gap-3">
        {notes.map((note) => (
          <div key={note.id} className="rounded-xl border border-border p-3">
            <div className="flex items-center justify-between text-xs text-faint">
              <span className="font-medium text-ink">{note.author}</span>
              <span>{formatDateTime(note.timestamp)}</span>
            </div>
            <p className="mt-1.5 text-sm text-muted">{note.note}</p>
          </div>
        ))}
        {notes.length === 0 && <p className="text-sm text-faint">No notes yet.</p>}
      </div>
      {error && <p className="mt-3 text-xs text-danger">{error}</p>}
      <div className="mt-4 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add a note…"
          className="flex-1 rounded-xl border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
        />
        <Button variant="secondary" onClick={handleAdd} disabled={isSaving}>
          {isSaving && <Spinner className="h-3.5 w-3.5" />}
          Add
        </Button>
      </div>
    </Card>
  )
}
