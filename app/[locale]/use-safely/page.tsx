import {getTranslations} from 'next-intl/server'
import type {Locale} from '@/i18n'
import {ApplicationGuide} from '@/components/sections/ApplicationGuide'

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  const tCommon = await getTranslations({locale: params.locale, namespace: 'common'})
  const tPage = await getTranslations({locale: params.locale, namespace: 'useSafely'})
  return {
    title: `${tCommon('brand')} — ${tPage('hero.title')}`,
    description: tPage('hero.subtitle')
  }
}

export default async function UseSafelyPage({params}: {params: {locale: Locale}}) {
  const locale = params.locale
  const tPage = await getTranslations({locale, namespace: 'useSafely'})
  const hero = tPage.raw('hero') as {title: string; subtitle: string}
  const steps = tPage.raw('steps') as Array<{title: string; description: string}>
  const precautions = tPage.raw('precautions') as string[]
  const patchTest = tPage.raw('patchTest') as {title: string; body: string}

  return (
    <div className="space-y-0">
      <section className="section">
        <div className="container space-y-4">
          <h1 className="text-4xl font-semibold text-neutral-900 md:text-5xl">{hero.title}</h1>
          <p className="max-w-2xl text-lg text-neutral-600">{hero.subtitle}</p>
        </div>
      </section>
      <ApplicationGuide title={hero.title} steps={steps} cautions={precautions} cautionTitle={patchTest.title} />
      <section className="section pb-20">
        <div className="container card-layered space-y-3">
          <h2 className="text-2xl font-semibold text-neutral-900">{patchTest.title}</h2>
          <p className="text-sm leading-relaxed text-neutral-600">{patchTest.body}</p>
        </div>
      </section>
    </div>
  )
}
