import type {MetadataRoute} from 'next'
import {locales} from '@/i18n'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '{{domain}}'

const routes = [
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
  '/product/psoriatinin-cool'
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()
  const entries: MetadataRoute.Sitemap = []
  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${siteUrl}/${locale}${route}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.7
      })
    }
  }
  return entries
}
