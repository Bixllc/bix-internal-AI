import { useState } from 'react'
import type { InternalNote } from '../../types'
import { formatDateTime } from '../../lib/format'
import { Button, Card, SectionHeading } from '../ui'

export function InternalNotesCard({ notes: initialNotes }: { notes: InternalNote[] }) {
  const [notes, setNotes] = useState(initialNotes)
  const [draft, setDraft] = useState('')

  function handleAdd() {
    if (!draft.trim()) return
    setNotes((prev) => [
      ...prev,
      {
        id: `note-${prev.length + 1}-${Date.now()}`,
        author: 'You',
        timestamp: new Date().toISOString(),
        note: draft.trim(),
      },
    ])
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
      <div className="mt-4 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add a note…"
          className="flex-1 rounded-xl border border-border bg-canvas px-3 py-2 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
        />
        <Button variant="secondary" onClick={handleAdd}>
          Add
        </Button>
      </div>
    </Card>
  )
}
