import Link from 'next/link'
import {Button} from '@/components/ui/button'

export type CatalogCardProps = {
  locale: string
  product: {
    slug: string
    name: string
    description: string
    highlights: string[]
    price: string
  }
  primaryCtaLabel: string
  secondaryCtaLabel: string
}

export function CatalogCard({locale, product, primaryCtaLabel, secondaryCtaLabel}: CatalogCardProps) {
  return (
    <article className="flex flex-col gap-6 rounded-3xl border border-brand/20 bg-white p-8 shadow-soft">
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold text-neutral-900">{product.name}</h3>
        <p className="text-sm text-neutral-600">{product.description}</p>
        <ul className="space-y-2 text-sm text-neutral-600">
          {product.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2">
              <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-500">
        <span className="badge-outline">{product.price}</span>
        <div className="flex gap-3">
          <Button href={`/${locale}/product/${product.slug}`} variant="secondary">
            {primaryCtaLabel}
          </Button>
          <Button href={`/${locale}/order`}>{secondaryCtaLabel}</Button>
        </div>
      </div>
    </article>
  )
}
