import {getTranslations} from 'next-intl/server'
import type {Locale} from '@/i18n'

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  const tCommon = await getTranslations({locale: params.locale, namespace: 'common'})
  const tPage = await getTranslations({locale: params.locale, namespace: 'brand'})
  return {
    title: `${tCommon('brand')} — ${tPage('hero.title')}`,
    description: tPage('hero.subtitle')
  }
}

export default async function BrandPage({params}: {params: {locale: Locale}}) {
  const locale = params.locale
  const tPage = await getTranslations({locale, namespace: 'brand'})
  const hero = tPage.raw('hero') as {title: string; subtitle: string}
  const mission = tPage.raw('mission') as {title: string; body: string}
  const production = tPage.raw('production') as {title: string; body: string}
  const certifications = tPage.raw('certifications') as {
    title: string
    description: string
    items: Array<{title: string; description: string; file: string}>
  }
  const promise = tPage.raw('promise') as {title: string; body: string}

  return (
    <div className="space-y-0">
      <section className="section">
        <div className="container space-y-4">
          <h1 className="text-4xl font-semibold text-neutral-900 md:text-5xl">{hero.title}</h1>
          <p className="max-w-2xl text-lg text-neutral-600">{hero.subtitle}</p>
        </div>
      </section>
      <section className="section bg-neutral-50/60">
        <div className="container grid gap-6 md:grid-cols-2">
          {[mission, production].map((block) => (
            <article key={block.title} className="card-layered space-y-3">
              <h2 className="text-2xl font-semibold text-neutral-900">{block.title}</h2>
              <p className="text-sm leading-relaxed text-neutral-600">{block.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">{certifications.title}</h2>
            <p className="text-sm text-neutral-600">{certifications.description}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {certifications.items.map((item) => (
              <article key={item.title} className="card-layered space-y-3">
                <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-600">{item.description}</p>
                <a href={item.file} className="text-sm font-semibold text-brand underline">
                  {item.file}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section pb-20">
        <div className="container card-layered space-y-3">
          <h2 className="text-2xl font-semibold text-neutral-900">{promise.title}</h2>
          <p className="text-sm leading-relaxed text-neutral-600">{promise.body}</p>
        </div>
      </section>
    </div>
  )
}
