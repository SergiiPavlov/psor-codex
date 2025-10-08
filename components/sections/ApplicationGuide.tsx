// components/sections/ApplicationGuide.tsx

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLocale, useTranslations } from 'next-intl'

export type ApplicationStep = {
  title: string
  description: string
}

type PerLocaleLinks = {
  ru?: { open: string; download: string }
  uk?: { open: string; download: string }
  en?: { open: string; download: string }
}

type Props = {
  title: string
  steps: ApplicationStep[]
  cautions?: string[]
  cautionTitle?: string
  /** Серый абзац под заголовком */
  disclaimer?: string
  /** id секции для якоря; по умолчанию how-to-apply */
  id?: string
  /**
   * Необязательные ссылки на PDF:
   * - либо одна пара: {open, download}
   * - либо поместные: {ru: {...}, uk: {...}, en: {...}}
   */
  docs?:
    | { open: string; download: string }
    | PerLocaleLinks
}

export default function ApplicationGuide({
  title,
  steps,
  cautions,
  cautionTitle,
  disclaimer,
  id,
  docs,
}: Props) {
  // Текущая локаль
  const rawLocale = useLocale() || 'ru'
  const locale = (['ru', 'uk', 'en'].includes(rawLocale) ? rawLocale : 'ru') as
    | 'ru'
    | 'uk'
    | 'en'

  // Тексты кнопок — из messages, как у остальных кнопок
  const t = useTranslations('home.application.docs')
  const openLabel =
    (t as any)?.('openLabel', { fallback: '' }) || // next-intl 3.x поддерживает fallback
    (locale === 'uk'
      ? 'Відкрити інструкцію (PDF)'
      : locale === 'en'
      ? 'Open instruction (PDF)'
      : 'Открыть инструкцию (PDF)')
  const downloadLabel =
    (t as any)?.('downloadLabel', { fallback: '' }) ||
    (locale === 'uk'
      ? 'Завантажити PDF'
      : locale === 'en'
      ? 'Download PDF'
      : 'Скачать PDF')

  // Нормализуем ссылки на PDF:
  // 1) если пришли поместные docs — берём для текущего locale
  // 2) если пришла одиночная пара — используем её
  // 3) иначе — стандартные файлы из public/docs
  let docLinks: { open: string; download: string }
  if (docs && (docs as PerLocaleLinks)[locale]?.open) {
    docLinks = (docs as PerLocaleLinks)[locale] as { open: string; download: string }
  } else if (docs && (docs as any).open) {
    docLinks = docs as { open: string; download: string }
  } else {
    const file =
      locale === 'en'
        ? '/docs/instruction-en.pdf'
        : locale === 'uk'
        ? '/docs/instruction-uk.pdf'
        : '/docs/instruction-ru.pdf'
    docLinks = { open: file, download: file }
  }

  return (
    <section id={id ?? 'how-to-apply'} className="section scroll-mt-24">
      <div className="container">
        {/* Заголовок — крупный, как в других секциях */}
        <h2 className="section__title text-3xl md:text-4xl font-semibold tracking-tight">
          {title}
        </h2>

        {/* Подводка/дисклеймер — читаемый абзац */}
        {disclaimer ? (
          <p className="mt-3 text-base md:text-lg text-muted-foreground">
            {disclaimer}
          </p>
        ) : null}

        {/* Кнопки инструкции: подписи из локали; PDF по текущей локали */}
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={docLinks.open} target="_blank" rel="noopener">
              {openLabel}
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <a href={docLinks.download} download>
              {downloadLabel}
            </a>
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Шаги применения */}
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl border bg-background p-4 shadow-sm"
              >
                <h3 className="text-lg font-medium">{step.title}</h3>
                <p className="mt-1 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Предостережения (если есть) */}
          {cautions?.length ? (
            <aside className="rounded-2xl border bg-background p-4 shadow-sm">
              {cautionTitle ? (
                <h3 className="text-lg font-medium">{cautionTitle}</h3>
              ) : null}
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                {cautions.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export { ApplicationGuide }
