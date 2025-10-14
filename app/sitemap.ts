// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { locales } from '@/i18n'

// Канонический базовый домен: берём из ENV, иначе — ваш прод-домен.
// Важно: без завершающего слэша.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://psoriatynin.biz.ua').replace(/\/+$/, '')

// Список путей (все начинаются с "/" кроме корня '')
const routes: string[] = [
  '',
  '/catalog',
  '/how-it-works',
  '/ingredients',
  '/results',
  '/brand',
  '/use-safely',
  '/blog',
  '/order',
  '/contacts',
  '/legal/privacy',
  '/legal/terms',
  '/legal/cookies',
  '/legal/delivery',
  '/legal/returns',
  '/product/psoriatinin-cream',
  '/product/psoriatinin-cool',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of routes) {
      // Корневая страница локали: `${siteUrl}/${locale}`
      // Остальные: `${siteUrl}/${locale}${route}`
      const url = route === '' ? `${siteUrl}/${locale}` : `${siteUrl}/${locale}${route}`

      entries.push({
        url,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.7,
      })
    }
  }

  return entries
}
