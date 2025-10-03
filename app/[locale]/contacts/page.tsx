import {getTranslations} from 'next-intl/server'
import type {Locale} from '@/i18n'

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  const tCommon = await getTranslations({locale: params.locale, namespace: 'common'})
  const tPage = await getTranslations({locale: params.locale, namespace: 'contacts'})
  return {
    title: `${tCommon('brand')} — ${tPage('hero.title')}`,
    description: tPage('hero.subtitle')
  }
}

export default async function ContactsPage({params}: {params: {locale: Locale}}) {
  const locale = params.locale
  const tPage = await getTranslations({locale, namespace: 'contacts'})
  const hero = tPage.raw('hero') as {title: string; subtitle: string}
  const channels = tPage.raw('channels') as Array<{type: string; label: string; value: string}>
  const schedule = tPage('schedule')
  const note = tPage('note')

  return (
    <div className="space-y-16 pb-20">
      <section className="section">
        <div className="container space-y-4">
          <h1 className="text-4xl font-semibold text-neutral-900 md:text-5xl">{hero.title}</h1>
          <p className="max-w-2xl text-lg text-neutral-600">{hero.subtitle}</p>
        </div>
      </section>
      <section className="container grid gap-6 md:grid-cols-2">
        {channels.map((channel) => (
          <article key={channel.type} className="card-layered space-y-2">
            <h2 className="text-xl font-semibold text-neutral-900">{channel.label}</h2>
            {channel.type === 'email' ? (
              <a href={`mailto:${channel.value}`} className="text-sm text-brand underline">
                {channel.value}
              </a>
            ) : channel.type === 'telegram' ? (
              <a href={channel.value} className="text-sm text-brand underline">
                {channel.value}
              </a>
            ) : (
              <p className="text-sm text-neutral-600">{channel.value}</p>
            )}
          </article>
        ))}
      </section>
      <section className="container space-y-3">
        <div className="card-layered space-y-2 text-sm text-neutral-600">
          <p>{schedule}</p>
          <p>{note}</p>
        </div>
      </section>
    </div>
  )
}
