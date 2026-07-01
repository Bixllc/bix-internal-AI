import type { DetectedSoftware as DetectedSoftwareType } from '../../types'
import { Card, SectionHeading } from '../ui'

export function DetectedSoftware({ software }: { software: DetectedSoftwareType }) {
  return (
    <Card className="p-6">
      <SectionHeading title="Detected Software" description="What we found running on their site — and what's missing." />
      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-faint">Found</p>
          <ul className="mt-3 flex flex-col gap-2">
            {software.found.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-ink">
                <span className="text-success">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-faint">Missing</p>
          <ul className="mt-3 flex flex-col gap-2">
            {software.missing.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-ink">
                <span className="text-danger">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
