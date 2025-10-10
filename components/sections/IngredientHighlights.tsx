import {Card} from '@/components/ui/card'

export type Ingredient = {
  name: string
  description: string
  note?: string
  short?: string
}

export function IngredientHighlights({title, subtitle, items}: {title: string; subtitle?: string; items: Ingredient[]}) {
  return (
    <section className="section">
      <div className="container space-y-12">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-dark">{subtitle}</p>
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">{title}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <Card key={item.name} className="h-full space-y-4 bg-white/90">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark/80">{item.short}</p>
                <h3 className="mt-2 text-lg font-semibold text-neutral-900">{item.name}</h3>
              </div>
              <p className="text-sm leading-relaxed text-neutral-600">{item.description}</p>
              {item.note ? <p className="text-xs text-neutral-400">{item.note}</p> : null}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
