'use client'

import {useState} from 'react'
import Image from 'next/image'

export type BeforeAfterItem = {
  id: string
  title?: string
  label: string
  description: string
}

export function BeforeAfterGallery({
  title,
  subtitle,
  disclaimer,
  items
}: {
  title: string
  subtitle?: string
  disclaimer?: string
  items: BeforeAfterItem[]
}) {
  const [activeId, setActiveId] = useState(items[0]?.id)
  const activeItem = items.find((item) => item.id === activeId) ?? items[0]

  return (
    <section className="section">
      <div className="container space-y-8">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">{title}</h2>
          {subtitle ? <p className="text-sm text-neutral-500">{subtitle}</p> : null}
        </div>
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-brand/30 bg-white shadow-soft">
              <Image src="/placeholder.svg" alt={activeItem?.label ?? 'Placeholder'} width={720} height={480} className="h-full w-full object-cover" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 px-4 py-3 text-sm shadow-soft">
                <p className="font-semibold text-brand">{activeItem?.label}</p>
                <p className="text-xs text-neutral-600">{activeItem?.description}</p>
              </div>
            </div>
            {disclaimer ? <p className="text-xs text-neutral-400">{disclaimer}</p> : null}
          </div>
          <div className="space-y-3">
            {items.map((item) => {
              const isActive = item.id === activeId
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={`w-full rounded-2xl border px-5 py-4 text-left transition ${isActive ? 'border-brand bg-brand-muted/70 text-brand' : 'border-brand/20 bg-white hover:border-brand/60'}`}
                >
                  <p className="text-sm font-semibold">{item.title ?? item.label}</p>
                  <p className="text-xs text-neutral-600">{item.description}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
