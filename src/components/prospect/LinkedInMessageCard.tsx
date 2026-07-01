import { Card, SectionHeading } from '../ui'

export function LinkedInMessageCard({ message }: { message: string }) {
  return (
    <Card className="p-6">
      <SectionHeading title="LinkedIn Message" />
      <div className="mt-4 rounded-xl border border-border bg-canvas p-4">
        <p className="text-sm leading-relaxed text-muted">{message}</p>
      </div>
    </Card>
  )
}
