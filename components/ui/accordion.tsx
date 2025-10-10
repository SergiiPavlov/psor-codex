
'use client'

import {PropsWithChildren, useState} from 'react'
import {cn} from '@/lib/utils'

type AccordionItem = {
  id: string
  title: string
  content: string
}

type AccordionProps = PropsWithChildren<{
  items: AccordionItem[]
  defaultOpenId?: string
}>

export function Accordion({items, defaultOpenId}: AccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(defaultOpenId ?? null)

  return (
    <div className="divide-y divide-neutral-200 overflow-hidden rounded-3xl border border-neutral-200 bg-white">
      {items.map((item) => {
        const isOpen = openItem === item.id
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.id}`}
              onClick={() => setOpenItem(isOpen ? null : item.id)}
              className={cn(
                'flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-neutral-900 transition',
                isOpen ? 'bg-brand-muted/60 text-brand' : 'hover:bg-neutral-100'
              )}
            >
              <span>{item.title}</span>
              <span aria-hidden>{isOpen ? '−' : '+'}</span>
            </button>
            <div
              id={`accordion-${item.id}`}
              hidden={!isOpen}
              className="px-6 pb-6 text-sm leading-relaxed text-neutral-700"
            >
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
