import {getTranslations} from 'next-intl/server'
import {CatalogCard} from '@/components/CatalogCard'
import type {Locale} from '@/i18n'

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  const tCommon = await getTranslations({locale: params.locale, namespace: 'common'})
  const tCatalog = await getTranslations({locale: params.locale, namespace: 'catalog'})
  return {
    title: `${tCommon('brand')} — ${tCatalog('title')}`,
    description: tCatalog('subtitle')
  }
}

export default async function CatalogPage({params}: {params: {locale: Locale}}) {
  const locale = params.locale
  const tCatalog = await getTranslations({locale, namespace: 'catalog'})
  const products = tCatalog.raw('products') as Array<{
    slug: string
    name: string
    description: string
    highlights: string[]
    price: string
  }>
  const subtitle = tCatalog('subtitle')
  const title = tCatalog('title')
  const ctaLabel = (await getTranslations({locale, namespace: 'common'}))('cta.order')

  return (
    <div className="section">
      <div className="container space-y-10">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl font-semibold text-neutral-900 md:text-5xl">{title}</h1>
          <p className="text-sm text-neutral-600">{subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <CatalogCard key={product.slug} locale={locale} product={product} ctaLabel={ctaLabel} />
          ))}
        </div>
      </div>
    </div>
  )
}
