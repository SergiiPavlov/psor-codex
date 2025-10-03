export type KeyIngredient = {
  name: string
  description: string
}

export function ProductComposition({
  title,
  description,
  inci,
  keyIngredients,
  note
}: {
  title: string
  description?: string
  inci: string
  keyIngredients: KeyIngredient[]
  note?: string
}) {
  return (
    <section className="section bg-neutral-50/60">
      <div className="container space-y-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">{title}</h2>
          {description ? <p className="text-sm text-neutral-500">{description}</p> : null}
          <div className="rounded-3xl border border-dashed border-brand/40 bg-white/90 p-6 text-sm text-neutral-600">
            <strong className="font-semibold text-neutral-900">INCI:</strong> {inci}
          </div>
          {note ? <p className="text-xs text-neutral-500">{note}</p> : null}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {keyIngredients.map((ingredient) => (
            <div key={ingredient.name} className="card-layered h-full space-y-3">
              <h3 className="text-lg font-semibold text-neutral-900">{ingredient.name}</h3>
              <p className="text-sm leading-relaxed text-neutral-600">{ingredient.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
