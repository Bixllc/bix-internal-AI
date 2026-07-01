import type { ReactNode } from 'react'

interface SectionHeadingProps {
  title: string
  description?: string
  action?: ReactNode
}

export function SectionHeading({ title, description, action }: SectionHeadingProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {action}
    </div>
  )
}
