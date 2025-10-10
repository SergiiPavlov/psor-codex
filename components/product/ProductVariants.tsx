export type ProductVariant = {
  id: string
  label: string
  price: string
}

export function ProductVariants({title, variants}: {title: string; variants: ProductVariant[]}) {
  if (!variants || variants.length === 0) return null
  return (
    <section className="section pt-0">
      <div className="container space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-900">{title}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {variants.map((variant) => (
            <div key={variant.id} className="flex items-center justify-between rounded-2xl border border-brand/20 bg-white px-5 py-4 shadow-soft">
              <div>
                <p className="text-sm font-semibold text-neutral-900">{variant.label}</p>
              </div>
              <p className="text-sm font-semibold text-brand">{variant.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
