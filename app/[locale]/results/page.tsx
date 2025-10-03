import {getTranslations} from 'next-intl/server'
import type {Locale} from '@/i18n'
import {BeforeAfterGallery} from '@/components/sections/BeforeAfterGallery'
import {ReviewsSection} from '@/components/sections/ReviewsSection'

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  const tCommon = await getTranslations({locale: params.locale, namespace: 'common'})
  const tPage = await getTranslations({locale: params.locale, namespace: 'results'})
  return {
    title: `${tCommon('brand')} — ${tPage('hero.title')}`,
    description: tPage('hero.subtitle')
  }
}

export default async function ResultsPage({params}: {params: {locale: Locale}}) {
  const locale = params.locale
  const tPage = await getTranslations({locale, namespace: 'results'})
  const homeReviews = await getTranslations({locale, namespace: 'home'})
  const hero = tPage.raw('hero') as {title: string; subtitle: string}
  const beforeAfter = tPage.raw('beforeAfter') as {title: string; description: string; items: Array<{id: string; title: string; description: string}>}
  const reviews = tPage.raw('reviews') as {
    title: string
    disclaimer: string
    form: {title: string; description: string}
  }
  const guarantee = tPage.raw('guarantee') as {title: string; description: string}

  return (
    <div className="space-y-0">
      <section className="section">
        <div className="container space-y-4">
          <h1 className="text-4xl font-semibold text-neutral-900 md:text-5xl">{hero.title}</h1>
          <p className="max-w-2xl text-lg text-neutral-600">{hero.subtitle}</p>
        </div>
      </section>
      <BeforeAfterGallery title={beforeAfter.title} subtitle={beforeAfter.description} items={beforeAfter.items.map((item) => ({...item, label: item.title}))} />
      <section className="section bg-neutral-50/60">
        <div className="container space-y-6">
          <ReviewsSection
            title={reviews.title}
            subtitle={reviews.disclaimer}
            items={(homeReviews.raw('reviews') as {items: Array<{name: string; location?: string; text: string}>}).items}
            invitation={reviews.form.description}
          />
          <div className="rounded-3xl border border-brand/20 bg-white p-6 text-sm text-neutral-600">
            <h2 className="text-xl font-semibold text-neutral-900">{reviews.form.title}</h2>
            <p className="mt-2 text-sm text-neutral-600">{reviews.form.description}</p>
          </div>
        </div>
      </section>
      <section className="section pb-20">
        <div className="container card-layered space-y-3">
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">{guarantee.title}</h2>
          <p className="text-sm text-neutral-600">{guarantee.description}</p>
        </div>
      </section>
    </div>
  )
}
