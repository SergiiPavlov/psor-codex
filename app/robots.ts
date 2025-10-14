// app/robots.ts
import type { MetadataRoute } from 'next'

// Базовый адрес сайта: берём из ENV, иначе — ваш канонический домен
const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://psoriatynin.biz.ua')

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
    ],
    // Абсолютный URL карты сайта (без плейсхолдеров)
    sitemap: `${siteUrl}/sitemap.xml`,
    // Опционально: подсказка для поисковиков, какой хост канонический
    host: siteUrl.replace(/^https?:\/\//, ''),
  }
}
