import { Card, SectionHeading } from '../ui'

interface BulletCardProps {
  title: string
  description?: string
  items: string[]
  bullet?: string
}

export function BulletCard({ title, description, items, bullet = '·' }: BulletCardProps) {
  return (
    <Card className="p-6">
      <SectionHeading title={title} description={description} />
      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
            <span className="mt-0.5 text-faint">{bullet}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
