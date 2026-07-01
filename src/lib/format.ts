const NOW = new Date('2026-06-30T16:10:00Z')

export function timeAgo(iso: string): string {
  const diffMs = NOW.getTime() - new Date(iso).getTime()
  const minutes = Math.round(diffMs / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  return `${days}d ago`
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function greetingForNow(): string {
  const hour = NOW.getUTCHours() - 7
  const normalized = ((hour % 24) + 24) % 24
  if (normalized < 12) return 'morning'
  if (normalized < 17) return 'afternoon'
  return 'evening'
}
