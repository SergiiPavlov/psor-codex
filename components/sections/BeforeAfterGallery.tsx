'use client'

import {useCallback, useMemo, useState} from 'react'
import Image from 'next/image'

export type BeforeAfterItem = {
  id: string
  title?: string
  label: string
  description: string
}

export function BeforeAfterGallery({ title, subtitle, disclaimer, items, priority = false }: { title: string; subtitle?: string; disclaimer?: string; items: BeforeAfterItem[]; priority?: boolean }) {
  const [index, setIndex] = useState(0)

  const safeItems = items?.length ? items : []
  const activeItem = useMemo(() => safeItems[Math.max(0, Math.min(index, safeItems.length - 1))], [safeItems, index])

  const goPrev = useCallback(() => {
    setIndex((i) => (safeItems.length ? (i - 1 + safeItems.length) % safeItems.length : 0))
  }, [safeItems.length])

  const goNext = useCallback(() => {
    setIndex((i) => (safeItems.length ? (i + 1) % safeItems.length : 0))
  }, [safeItems.length])

  if (!safeItems.length) return null

  return (
    <section className="section">
      <div className="container space-y-8">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">{title}</h2>
          {subtitle ? <p className="text-sm text-neutral-500">{subtitle}</p> : null}
        </div>

        {/* IMAGE with arrows */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl border border-brand/30 bg-white shadow-soft">
            <Image
              src={`/images/results/${activeItem?.id}-1200.webp`}
              alt={activeItem?.label ?? 'before/after photo'}
              sizes="(max-width: 768px) 100vw, 960px"
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              priority={priority}
              fetchPriority={priority ? 'high' : undefined}
            />

            {/* arrows */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous"
                onClick={goPrev}
                className="pointer-events-auto m-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand/30 bg-white/90 text-brand shadow-soft backdrop-blur transition hover:bg-white"
              >
                {/* left chevron */}
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={goNext}
                className="pointer-events-auto m-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand/30 bg-white/90 text-brand shadow-soft backdrop-blur transition hover:bg-white"
              >
                {/* right chevron */}
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* info card UNDER the photo (no overlay) */}
          <div className="rounded-2xl border border-brand/30 bg-white px-5 py-4 shadow-soft">
            <p className="font-semibold text-brand">{activeItem?.title ?? activeItem?.label}</p>
            <p className="mt-1 text-sm text-neutral-600">{activeItem?.description}</p>
          </div>

          {disclaimer ? <p className="text-xs text-neutral-400">{disclaimer}</p> : null}
        </div>
      </div>
    </section>
  )
}
