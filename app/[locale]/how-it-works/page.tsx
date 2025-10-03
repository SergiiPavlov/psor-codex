import {getTranslations} from 'next-intl/server'
import type {Locale} from '@/i18n'
import {Timeline} from '@/components/sections/Timeline'
import {CallToActionStrip} from '@/components/sections/CallToActionStrip'

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  const tCommon = await getTranslations({locale: params.locale, namespace: 'common'})
  const tPage = await getTranslations({locale: params.locale, namespace: 'howItWorks'})
  return {
    title: `${tCommon('brand')} — ${tPage('hero.title')}`,
    description: tPage('hero.subtitle')
  }
}

export default async function HowItWorksPage({params}: {params: {locale: Locale}}) {
  const locale = params.locale
  const tPage = await getTranslations({locale, namespace: 'howItWorks'})
  const hero = tPage.raw('hero') as {title: string; subtitle: string}
  const sections = tPage.raw('sections') as Array<{title: string; body: string}>
  const timeline = tPage.raw('timeline') as {title: string; items: Array<{title: string; description: string}>}
  const faqCta = tPage.raw('faqCta') as {title: string; description: string; cta: string}

  return (
    <div className="space-y-0">
      <section className="section">
        <div className="container space-y-6">
          <h1 className="text-4xl font-semibold text-neutral-900 md:text-5xl">{hero.title}</h1>
          <p className="max-w-2xl text-lg text-neutral-600">{hero.subtitle}</p>
          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((section) => (
              <article key={section.title} className="card-layered space-y-3">
                <h2 className="text-xl font-semibold text-neutral-900">{section.title}</h2>
                <p className="text-sm leading-relaxed text-neutral-600">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Timeline title={timeline.title} items={timeline.items} />
      <CallToActionStrip
        title={faqCta.title}
        subtitle={faqCta.description}
        cta={{label: faqCta.cta, href: `/${locale}#faq`}}
      />
    </div>
  )
}
