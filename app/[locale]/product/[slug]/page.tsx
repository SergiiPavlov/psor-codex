import {notFound} from 'next/navigation'
import {getTranslations} from 'next-intl/server'
import type {Locale} from '@/i18n'
import {ProductHero} from '@/components/product/ProductHero'
import {ProductSummary} from '@/components/product/ProductSummary'
import {ProductGallery} from '@/components/product/ProductGallery'
import {FeatureGrid} from '@/components/sections/FeatureGrid'
import {HowItWorks as HowItWorksSection} from '@/components/sections/HowItWorks'
import {ApplicationGuide} from '@/components/sections/ApplicationGuide'
import {ProductComposition} from '@/components/product/ProductComposition'
import {ReviewsSection} from '@/components/sections/ReviewsSection'
import {FAQSection} from '@/components/sections/FAQSection'
import {ProductLogistics} from '@/components/product/ProductLogistics'
import {CallToActionStrip} from '@/components/sections/CallToActionStrip'
import {JsonLd} from '@/components/JsonLd'

const PRODUCT_SLUGS = ['psoriatinin-cream', 'psoriatinin-cool'] as const

type ProductSlug = typeof PRODUCT_SLUGS[number]

type ProductContent = {
  name: string
  hero: {label?: string; description: string; badges?: string[]}
  summary: {title: string; points: string[]}
  gallery: Array<{id: string; label: string; description: string; url: string}>
  variantsTitle?: string
  variants: Array<{id: string; label: string; price: string}>
  highlights: {title: string; items: Array<{title: string; description: string}>}
  howItWorks: {title: string; items: Array<{title: string; description: string}>}
  application: {title: string; steps: Array<{title: string; description: string}>; warnings: string[]}
  composition: {
    title: string
    description: string
    inci: string
    keyIngredients: Array<{name: string; description: string}>
  }
  faq: Array<{question: string; answer: string}>
  reviews: Array<{name: string; text: string}>
  logistics: {title: string; delivery: string; payment: string; guarantee: string}
  jsonLd: {sku: string; gtin13: string}
}

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({slug}))
}

export async function generateMetadata({params}: {params: {locale: Locale; slug: string}}) {
  const locale = params.locale
  const slug = params.slug as ProductSlug
  if (!PRODUCT_SLUGS.includes(slug)) notFound()
  const tProducts = await getTranslations({locale, namespace: 'products'})
  const product = tProducts.raw(slug) as ProductContent | undefined
  if (!product) notFound()
  const tCommon = await getTranslations({locale, namespace: 'common'})
  return {
    title: `${product.name} — ${tCommon('brand')}`,
    description: product.hero.description
  }
}

export default async function ProductPage({params}: {params: {locale: Locale; slug: string}}) {
  const locale = params.locale
  const slug = params.slug as ProductSlug
  if (!PRODUCT_SLUGS.includes(slug)) notFound()

  const tProducts = await getTranslations({locale, namespace: 'products'})
  const product = tProducts.raw(slug) as ProductContent | undefined
  if (!product) notFound()

  const tCommon = await getTranslations({locale, namespace: 'common'})
  const tHome = await getTranslations({locale, namespace: 'home'})
  const cta = await getTranslations({locale, namespace: 'catalog'})
  const logisticsLabels = tCommon.raw('logisticsLabels') as {delivery: string; payment: string; guarantee: string}

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.jsonLd?.sku,
    gtin13: product.jsonLd?.gtin13,
    description: product.hero.description,
    brand: {
      '@type': 'Brand',
      name: tCommon('brand')
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: tCommon('currency'),
      price: product.variants?.[0]?.price ?? tCommon('placeholders.sizesAndPrices'),
      availability: 'https://schema.org/PreOrder'
    }
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }

  const basePath = `/${locale}`

  return (
    <div className="pb-16">
      <JsonLd id={`product-${slug}`} data={productJsonLd} />
      <JsonLd id={`product-faq-${slug}`} data={faqJsonLd} />
      <ProductHero name={product.name} label={product.hero.label} description={product.hero.description} badges={product.hero.badges} />
      <ProductSummary title={product.summary.title} points={product.summary.points} />
      <ProductGallery items={product.gallery} />
      <FeatureGrid title={product.highlights.title} items={product.highlights.items} />
      <HowItWorksSection title={product.howItWorks.title} steps={product.howItWorks.items} />
      <ApplicationGuide
        title={product.application.title}
        steps={product.application.steps}
        cautions={product.application.warnings}
        cautionTitle={tCommon('nonMedical')}
      />
      <ProductComposition
        title={product.composition.title}
        description={product.composition.description}
        inci={product.composition.inci}
        keyIngredients={product.composition.keyIngredients}
        note={tCommon('placeholders.inci')}
      />
      <ReviewsSection title={tHome('reviews.title')} subtitle={tHome('reviews.subtitle')} items={product.reviews} />
      <FAQSection title={tHome('faq.title')} items={product.faq} />
      <ProductLogistics
        title={product.logistics.title}
        delivery={product.logistics.delivery}
        payment={product.logistics.payment}
        guarantee={product.logistics.guarantee}
        labels={logisticsLabels}
      />
      <CallToActionStrip
        title={tCommon('cta.order')}
        subtitle={tCommon('logistics.delivery')}
        cta={{label: tCommon('cta.order'), href: `${basePath}/order`}}
      />
    </div>
  )
}
