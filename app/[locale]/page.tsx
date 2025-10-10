import {getTranslations} from 'next-intl/server'
import {Hero} from '@/components/sections/Hero'
import {FeatureGrid} from '@/components/sections/FeatureGrid'
import {HowItWorks} from '@/components/sections/HowItWorks'
import {IngredientHighlights} from '@/components/sections/IngredientHighlights'
import {ApplicationGuide} from '@/components/sections/ApplicationGuide'
import {BeforeAfterGallery} from '@/components/sections/BeforeAfterGallery'
import {ReviewsSection} from '@/components/sections/ReviewsSection'
import {FAQSection} from '@/components/sections/FAQSection'
import {CallToActionStrip} from '@/components/sections/CallToActionStrip'
import type {Locale} from '@/i18n'

export const revalidate = 3600

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  const t = await getTranslations({locale: params.locale, namespace: 'common'})
  return {
    title: `${t('brand')} — ${t('tagline')}`,
    description: t('description')
  }
}

export default async function HomePage({params}: {params: {locale: Locale}}) {
  const locale = params.locale
  const tHome = await getTranslations({locale, namespace: 'home'})
  const tCommon = await getTranslations({locale, namespace: 'common'})
  const hero = tHome.raw('hero') as {
    eyebrow: string
    title: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
    checklist: string[]
  }
  const benefits = tHome.raw('benefits') as {title: string; items: Array<{title: string; description: string}>}
  const howItWorks = tHome.raw('howItWorks') as {title: string; subtitle: string; steps: Array<{title: string; description: string}>}
  const ingredients = tHome.raw('ingredients') as {title: string; subtitle: string; items: Array<{name: string; description: string}>}
  const application = tHome.raw('application') as { title: string; disclaimer: string; steps: Array<{title: string; description: string}>; cautions: string[]; docs?: {open: string; download: string} }
  const beforeAfter = tHome.raw('beforeAfter') as {
    title: string
    subtitle: string
    items: Array<{id: string; label: string; description: string}>
    disclaimer: string
  }
  const reviews = tHome.raw('reviews') as {
    title: string
    subtitle: string
    items: Array<{name: string; location?: string; text: string}>
    invitation: string
  }
  const faq = tHome.raw('faq') as {title: string; items: Array<{question: string; answer: string}>}
  const ctaStrip = tHome.raw('ctaStrip') as {title: string; subtitle: string; primaryCta: string}

  const basePath = `/${locale}`

  return (
    <div className="space-y-0">
      <Hero
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        primaryCta={{label: hero.primaryCta, href: `${basePath}/order`}}
        secondaryCta={{label: hero.secondaryCta, href: '#how-to-apply'}}
        checklist={hero.checklist}
        imageAlt={tCommon('nonMedical')}
      />
      <FeatureGrid title={benefits.title} items={benefits.items} />
      <HowItWorks title={howItWorks.title} subtitle={howItWorks.subtitle} steps={howItWorks.steps} />
      <IngredientHighlights title={ingredients.title} subtitle={ingredients.subtitle} items={ingredients.items} />
      <ApplicationGuide id="how-to-apply" docs={application.docs}
        title={application.title}
        disclaimer={application.disclaimer}
        steps={application.steps}
        cautions={application.cautions}
        cautionTitle={tCommon('nonMedical')}
      />
      <BeforeAfterGallery
        title={beforeAfter.title}
        subtitle={beforeAfter.subtitle}
        items={beforeAfter.items}
        disclaimer={beforeAfter.disclaimer}
      />
      <ReviewsSection
        title={reviews.title}
        subtitle={reviews.subtitle}
        items={reviews.items}
        invitation={reviews.invitation}
      />
      <FAQSection title={faq.title} items={faq.items} />
      <CallToActionStrip
        title={ctaStrip.title}
        subtitle={ctaStrip.subtitle}
        cta={{label: ctaStrip.primaryCta, href: `${basePath}/order`}}
      />
    </div>
  )
}
