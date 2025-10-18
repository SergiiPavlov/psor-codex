import {getTranslations} from 'next-intl/server'
import type {Locale} from '@/i18n'
import {OrderForm, OrderFormContent} from '@/components/OrderForm'

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  const tCommon = await getTranslations({locale: params.locale, namespace: 'common'})
  const tOrder = await getTranslations({locale: params.locale, namespace: 'order'})
  return {
    title: `${tCommon('brand')} — ${tOrder('hero.title')}`,
    description: tOrder('hero.subtitle')
  }
}

export default async function OrderPage({params}: {params: {locale: Locale}}) {
  const locale = params.locale
  const tOrder = await getTranslations({locale, namespace: 'order'})
  const tContacts = await getTranslations({locale, namespace: 'contacts'})
  const hero = tOrder.raw('hero') as {title: string; subtitle: string}
  const form = tOrder.raw('form') as OrderFormContent
  const guarantee = tOrder.raw('guarantee') as {title: string; items: string[]}
  const logistics = tOrder.raw('logistics') as {delivery: string; payment: string}
  const rep = tContacts.raw('representative') as {person: string; phones: string[]; shop: {label: string; url: string}}
  const contactPersonLabel = tContacts('contactPersonLabel')
  const channels = tContacts.raw('channels') as Array<{type: string; label: string; value: string}>
  const repLabel = (channels.find(c => c.type === 'representative')?.label) ?? 'Наш представитель'
  const catalog = await getTranslations({locale, namespace: 'catalog'})
  const products = catalog.raw('products') as Array<{slug: string; name: string}>

  const formContent: OrderFormContent = {
    ...form,
    products: products.map((product) => ({value: product.slug, label: product.name}))
  }

  return (
    <div className="space-y-16 pb-20">
      <section className="section">
        <div className="container space-y-4">
          <h1 className="text-4xl font-semibold text-neutral-900 md:text-5xl">{hero.title}</h1>
          <p className="max-w-2xl text-lg text-neutral-600">{hero.subtitle}</p>
        </div>
      </section>
      <section className="container grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div className="card-layered">
          <OrderForm content={formContent} />
        </div>
        <aside className="space-y-8">
          <div className="card-layered space-y-4">
            <h2 className="text-xl font-semibold text-neutral-900">{guarantee.title}</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-neutral-600">
              {guarantee.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-layered space-y-2 text-sm text-neutral-600">
            <h2 className="text-xl font-semibold text-neutral-900">{logistics.delivery}</h2>
            <p>{logistics.payment}</p>
          </div>
          <div className="card-layered space-y-2 text-sm text-neutral-600">
            <h2 className="text-xl font-semibold text-neutral-900">{repLabel}</h2>
            <div className="space-y-1">
              <p>
                {rep.phones.map((ph, i) => (
                  <span key={ph}>
                    <a href={`tel:${ph.replace(/\s|\(|\)|-/g, '')}`} className="text-brand underline">{ph}</a>
                    {i < rep.phones.length - 1 ? <span className="mx-2">·</span> : null}
                  </span>
                ))}
              </p>
              <p>{contactPersonLabel} {rep.person}</p>
              <p><a href={rep.shop.url} target="_blank" rel="noopener noreferrer" className="text-brand underline">{rep.shop.label}</a></p>
            </div>
          </div>

        </aside>
      </section>
    </div>
  )
}
