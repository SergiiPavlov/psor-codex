import {getTranslations} from 'next-intl/server'
import type {Locale} from '@/i18n'
import {JsonLd} from '@/components/JsonLd'

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  const tCommon = await getTranslations({locale: params.locale, namespace: 'common'})
  const tBlog = await getTranslations({locale: params.locale, namespace: 'blog'})
  return {
    title: `${tCommon('brand')} — ${tBlog('hero.title')}`,
    description: tBlog('hero.subtitle')
  }
}

export default async function BlogPage({params}: {params: {locale: Locale}}) {
  const locale = params.locale
  const tBlog = await getTranslations({locale, namespace: 'blog'})
  const hero = tBlog.raw('hero') as {title: string; subtitle: string}
  const posts = tBlog.raw('posts') as Array<{
    slug: string
    title: string
    description: string
    date: string
    readingTime: string
    content: string[]
  }>
  const tCommon = await getTranslations({locale, namespace: 'common'})

  return (
    <div className="space-y-0 pb-20">
      <section className="section">
        <div className="container space-y-4">
          <h1 className="text-4xl font-semibold text-neutral-900 md:text-5xl">{hero.title}</h1>
          <p className="max-w-2xl text-lg text-neutral-600">{hero.subtitle}</p>
        </div>
      </section>
      <section className="container space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="card-layered space-y-4">
            <JsonLd
              id={`article-${post.slug}`}
              data={{
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: post.title,
                datePublished: post.date,
                author: {
                  '@type': 'Organization',
                  name: tCommon('brand')
                },
                publisher: {
                  '@type': 'Organization',
                  name: tCommon('brand')
                },
                description: post.description
              }}
            />
            <header className="space-y-1">
              <h2 className="text-2xl font-semibold text-neutral-900">{post.title}</h2>
              <p className="text-sm text-neutral-500">
                {post.date} • {post.readingTime}
              </p>
            </header>
            <p className="text-sm text-neutral-600">{post.description}</p>
            <div className="prose-custom space-y-3">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
