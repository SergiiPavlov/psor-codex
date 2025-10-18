import {getTranslations} from 'next-intl/server'
import type {Locale} from '@/i18n'
import { BrandIcon } from "@/components/ui/BrandIcon"

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
  const contactPersonLabel = (await getTranslations({locale, namespace: 'contacts'}))('contactPersonLabel').catch?.(() => 'Контактное лицо —')
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
              <a href={`mailto:psoriatynin@gmail.com?subject=Вопрос%20о%20Псориатинин&body=Здравствуйте%2C%20хочу%20уточнить...`} className="text-sm text-brand underline">
                {channel.value}
              </a>
            ) : channel.type === 'telegram' ? (<p className="text-sm text-neutral-600 flex flex-wrap gap-3"><a href="tg://resolve?phone=380667213166"><BrandIcon brand="telegram" className="inline-block align-[-2px]" />
<span className="sr-only">Telegram</span></a><span>·</span><a href="https://wa.me/380667213166"><BrandIcon brand="whatsapp" className="inline-block align-[-2px]" />
<span className="sr-only">WhatsApp</span></a><span>·</span><a href="viber://chat?number=%2B380667213166"><BrandIcon brand="viber" className="inline-block align-[-2px]" />
<span className="sr-only">Viber</span></a></p>) : (
              <>{channel.type === 'telegram' ? (<p className="text-sm text-neutral-600 flex flex-wrap gap-3"><a href="tg://resolve?phone=380667213166"><BrandIcon brand="telegram" className="inline-block align-[-2px]" />
<span className="sr-only">Telegram</span></a><span>·</span><a href="https://wa.me/380667213166"><BrandIcon brand="whatsapp" className="inline-block align-[-2px]" />
<span className="sr-only">WhatsApp</span></a><span>·</span><a href="viber://chat?number=%2B380667213166"><BrandIcon brand="viber" className="inline-block align-[-2px]" />
<span className="sr-only">Viber</span></a></p>
            ) : channel.type === 'representative' ? (
              (() => {
                const rep = tPage.raw('representative') as {
                  person: string;
                  phones: string[];
                  shop: { label: string; url: string };
                };
                return (
                  <div className="space-y-1 text-sm text-neutral-600">
                    <p>
                      {rep.phones.map((ph, i) => (
                        <span key={ph}>
                          <a href={`tel:${ph.replace(/\s|\(|\)|-/g, '')}`} className="text-brand underline">{ph}</a>
                          {i < rep.phones.length - 1 ? <span className="mx-2">·</span> : null}
                        </span>
                      ))}
                    </p>
                    <p>{tPage('contactPersonLabel')} {rep.person}</p>
                    <p>
                      <a href={rep.shop.url} target="_blank" rel="noopener noreferrer" className="text-brand underline">{rep.shop.label}</a>
                    </p>
                  </div>
                );
              })()
            
            ) : (<p className="text-sm text-neutral-600">{channel.value}</p>)}</>
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