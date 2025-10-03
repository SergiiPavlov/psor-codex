import {getTranslations} from 'next-intl/server'
import type {Locale} from '@/i18n'
import {LegalArticle} from '@/components/legal/LegalArticle'

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  const tCommon = await getTranslations({locale: params.locale, namespace: 'common'})
  const tLegal = await getTranslations({locale: params.locale, namespace: 'legal'})
  const page = tLegal.raw('terms') as {title: string; intro: string}
  return {
    title: `${tCommon('brand')} — ${page.title}`,
    description: page.intro
  }
}

export default async function TermsPage({params}: {params: {locale: Locale}}) {
  const locale = params.locale
  const tLegal = await getTranslations({locale, namespace: 'legal'})
  const page = tLegal.raw('terms') as {title: string; intro: string; sections: Array<{title: string; body: string}>}
  return <LegalArticle title={page.title} intro={page.intro} sections={page.sections} />
}
