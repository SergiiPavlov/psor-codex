import Image from 'next/image'
import { Button } from '@/components/ui/button'

export type HeroProps = {
  eyebrow?: string
  title: string
  subtitle: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  checklist?: string[]
  imageAlt?: string
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  checklist,
  imageAlt,
}: HeroProps) {
  return (
    <section className="section">
      <div className="container grid gap-12 md:grid-cols-[1.2fr_1fr]">
        {/* Левая колонка */}
        <div className="space-y-6">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="text-4xl font-semibold leading-tight text-neutral-900 md:text-5xl">
            {title}
          </h1>

          <p className="text-lg text-neutral-600 md:text-xl">{subtitle}</p>

          <div className="flex flex-wrap items-center gap-3">
            {primaryCta ? (
              <Button href={primaryCta.href} className="px-6 py-3 text-base">
                {primaryCta.label}
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button
                href={secondaryCta.href}
                variant="secondary"
                className="px-6 py-3 text-base"
              >
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>

          {checklist && checklist.length > 0 ? (
            <ul className="mt-6 space-y-3">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-neutral-700"
                >
                  <span
                    className="mt-1 inline-flex h-3 w-3 shrink-0 rounded-full bg-brand"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Правая карточка с фото — ширину не меняем, убираем лишнюю высоту */}
        <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-brand-muted/40 p-6">
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/60 via-brand-muted/40 to-brand/10"
            aria-hidden
          />

          <div className="relative flex flex-col items-center justify-center gap-3 text-center">
              <span className="badge-soft">
    {'Рекомендовано НИИ дерматологии и венерологии, г. Харьков'}
  </span>

            {/* Больше НИКАКОЙ фиксированной высоты/аспекта! */}
            <div className="w-full rounded-2xl bg-white/70 shadow-inner">
              <Image
                src="/images/hero/psoriatynin-duo-2048.webp"
                alt={imageAlt ?? 'Placeholder illustration'}
                width={2048}         /* нативные пропорции изображения */
                height={1107}
                priority
                sizes="(min-width:1280px) 36vw, (min-width:768px) 45vw, 100vw"
                className="block w-full h-auto object-contain"
              />
            </div>

            <p className="text-xs text-neutral-500">
              {imageAlt ?? 'TODO: replace with brand visuals — {{assets_links}}'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
