// app/[locale]/brand/page.tsx
import Link from 'next/link'
import {getTranslations} from 'next-intl/server'
import type {Locale} from '@/i18n'

export const revalidate = 3600

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  const locale = params.locale
  const tCommon = await getTranslations({locale, namespace: 'common'})
  const tBrand  = await getTranslations({locale, namespace: 'brand'})
  const hero    = tBrand.raw('hero') as {title: string; subtitle: string}

  return {
    title: `${tCommon('brand')} — ${hero.title}`,
    description: hero.subtitle
  }
}

type CertItem = {
  title: string
  description: string
  summary?: string
  file: string
  // thumb?: string // больше не нужен
}

export default async function BrandPage({params}: {params: {locale: Locale}}) {
  const locale   = params.locale
  const tBrand   = await getTranslations({locale, namespace: 'brand'})
  const tDocs    = await getTranslations({locale, namespace: 'home.application.docs'})

  const hero     = tBrand.raw('hero') as {title: string; subtitle: string}
  const certs    = tBrand.raw('certifications') as {
    title: string
    subtitle: string
    items: CertItem[]
  }

  const openLabel     = tDocs('openLabel')
  const downloadLabel = tDocs('downloadLabel')

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-semibold mb-4">{hero.title}</h1>
      <p className="text-lg text-muted-foreground mb-10">{hero.subtitle}</p>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-2">{certs.title}</h2>
        <p className="text-muted-foreground mb-6">{certs.subtitle}</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certs.items.map((item, idx) => (
            <article
              key={idx}
              className="rounded-2xl border p-5 bg-card shadow-sm flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {item.description}
              </p>
              {item.summary && (
                <p className="text-sm text-muted-foreground mb-4">
                  {item.summary}
                </p>
              )}

              <div className="mt-auto flex items-center gap-3 pt-2">
                <Link
                  href={item.file}
                  target="_blank"
                  className="inline-flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                >
                  {openLabel}
                </Link>
                <a
                  href={item.file}
                  download
                  className="inline-flex items-center rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm hover:opacity-90"
                >
                  {downloadLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

