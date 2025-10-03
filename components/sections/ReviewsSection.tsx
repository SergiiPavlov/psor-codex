import {Card} from '@/components/ui/card'

export type Review = {
  name: string
  location?: string
  text: string
}

export function ReviewsSection({
  title,
  subtitle,
  invitation,
  items
}: {
  title: string
  subtitle?: string
  invitation?: string
  items: Review[]
}) {
  return (
    <section className="section bg-neutral-50/60">
      <div className="container space-y-12">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">{title}</h2>
          {subtitle ? <p className="text-sm text-neutral-500">{subtitle}</p> : null}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((review) => (
            <Card key={review.name} className="h-full space-y-4 bg-white">
              <div>
                <p className="text-sm font-semibold text-neutral-900">{review.name}</p>
                {review.location ? <p className="text-xs text-neutral-500">{review.location}</p> : null}
              </div>
              <p className="text-sm leading-relaxed text-neutral-600">{review.text}</p>
            </Card>
          ))}
        </div>
        {invitation ? <p className="text-sm text-neutral-500">{invitation}</p> : null}
      </div>
    </section>
  )
}
