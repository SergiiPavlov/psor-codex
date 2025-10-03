import {getTranslations} from 'next-intl/server'
import type {Locale} from '@/i18n'
import {IngredientHighlights} from '@/components/sections/IngredientHighlights'

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  const tCommon = await getTranslations({locale: params.locale, namespace: 'common'})
  const tPage = await getTranslations({locale: params.locale, namespace: 'ingredientsPage'})
  return {
    title: `${tCommon('brand')} — ${tPage('hero.title')}`,
    description: tPage('hero.subtitle')
  }
}

export default async function IngredientsPage({params}: {params: {locale: Locale}}) {
  const locale = params.locale
  const tPage = await getTranslations({locale, namespace: 'ingredientsPage'})
  const hero = tPage.raw('hero') as {title: string; subtitle: string}
  const cards = tPage.raw('cards') as Array<{name: string; short: string; description: string; note: string}>
  const note = tPage('note')

  return (
    <div className="space-y-0">
      <section className="section">
        <div className="container space-y-4">
          <h1 className="text-4xl font-semibold text-neutral-900 md:text-5xl">{hero.title}</h1>
          <p className="max-w-2xl text-lg text-neutral-600">{hero.subtitle}</p>
        </div>
      </section>
      <IngredientHighlights title={hero.title} subtitle={hero.subtitle} items={cards} />
      <section className="pb-16">
        <div className="container">
          <div className="alert">{note}</div>
        </div>
      </section>
    </div>
  )
}
