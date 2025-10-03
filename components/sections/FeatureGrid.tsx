import {Card} from '@/components/ui/card'

export type Feature = {
  title: string
  description: string
}

export function FeatureGrid({title, items}: {title: string; items: Feature[]}) {
  return (
    <section className="section bg-neutral-50/60">
      <div className="container space-y-12">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">{title}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <Card key={item.title} className="h-full space-y-3 bg-white/90">
              <h3 className="text-xl font-semibold text-neutral-900">{item.title}</h3>
              <p className="text-sm leading-relaxed text-neutral-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
