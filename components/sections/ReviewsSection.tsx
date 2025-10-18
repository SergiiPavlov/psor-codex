'use client'

import {useEffect, useMemo, useRef, useState} from 'react'
import {useTranslations} from 'next-intl'
import {Card} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'

export type Review = {
  name: string
  location?: string
  text: string
}

export function ReviewsSection({
  title,
  subtitle,
  invitation,
  items
}: {
  title: string
  subtitle?: string
  invitation?: string
  items: Review[]
}) {
  const tCommon = useTranslations('common')
  const tHome = useTranslations('home')

  const containerRef = useRef<HTMLDivElement | null>(null)

  const allItems = useMemo(() => items || [], [items])

  const scrollByViewport = (dir: -1 | 1) => {
    const el = containerRef.current
    if (!el) return
    const amount = Math.round(el.clientWidth * 0.9)
    el.scrollBy({left: dir * amount, behavior: 'smooth'})
  }

  const [open, setOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState<null | 'ok' | 'err'>(null)

  const [form, setForm] = useState({
    name: '',
    age: '',
    city: '',
    productVersion: 'Original',
    rating: 5,
    text: '',
    consent: false,
  })

  const onChange = (k: string, v: any) => setForm((s) => ({...s, [k]: v}))

  const submit = async () => {
    if (!form.name.trim() || !form.text.trim()) {
      alert(tHome('reviews.form.error')) // показать локализованное сообщение
      return
    }
    if (!form.consent) {
      alert(tHome('reviews.form.consent'))
      return
    }
    try {
      setSending(true)
      setSent(null)
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: form.name.trim(),
          age: form.age || undefined,
          city: form.city || undefined,
          productVersion: form.productVersion,
          rating: form.rating,
          text: form.text.trim(),
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json?.ok !== false) {
        setSent('ok')
        setForm({
          name: '',
          age: '',
          city: '',
          productVersion: 'Original',
          rating: 5,
          text: '',
          consent: false,
        })
      } else {
        setSent('err')
      }
    } catch (e) {
      setSent('err')
    } finally {
      setSending(false)
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="reviews" className="relative scroll-mt-24 bg-neutral-50 py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">{title}</h2>
          {subtitle ? <p className="mt-2 text-sm text-neutral-500">{subtitle}</p> : null}
        </div>

        <div className="relative">
          {/* Arrows */}
          <button
            aria-label={tHome('reviews.prev')}
            onClick={() => scrollByViewport(-1)}
            className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-neutral-200 bg-white/90 p-2 shadow md:flex hover:bg-white"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label={tHome('reviews.next')}
            onClick={() => scrollByViewport(1)}
            className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-neutral-200 bg-white/90 p-2 shadow md:flex hover:bg-white"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={containerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
          >
            {allItems.map((review, idx) => (
              <div
                key={idx + review.name}
                className="snap-start shrink-0 basis-full pr-1 sm:pr-2 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full space-y-4 bg-white p-5 shadow-sm">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{review.name}</p>
                    {review.location ? <p className="text-xs text-neutral-500">{review.location}</p> : null}
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-700">{review.text}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {invitation ? <p className="text-sm text-neutral-500">{invitation}</p> : <span />}
          <Button onClick={() => setOpen(true)} className="self-start">
            {tCommon('cta.leaveReview')}
          </Button>
        </div>
      </div>

      {/* Modal */}
      {open ? (
        <div
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{tHome('reviews.form.title')}</h3>
              <button onClick={() => setOpen(false)} className="rounded p-1 text-neutral-500 hover:bg-neutral-100">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Input
                placeholder={tHome('reviews.form.name')}
                value={form.name}
                onChange={(e) => onChange('name', e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder={tHome('reviews.form.age')} value={form.age} onChange={(e) => onChange('age', e.target.value)} />
                <Input placeholder={tHome('reviews.form.city')} value={form.city} onChange={(e) => onChange('city', e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select
                  className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-neutral-300"
                  value={form.productVersion}
                  onChange={(e) => onChange('productVersion', e.target.value)}
                >
                  <option value="Original">{tHome('reviews.form.versionOriginal')}</option>
                  <option value="Cool">{tHome('reviews.form.versionCool')}</option>
                </select>

                <select
                  className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-neutral-300"
                  value={String(form.rating)}
                  onChange={(e) => onChange('rating', Number(e.target.value))}
                >
                  {[5,4,3,2,1].map((n) => (
                    <option key={n} value={n}>{tHome('reviews.form.ratingOption', {value: n})}</option>
                  ))}
                </select>
              </div>

              <Textarea
                placeholder={tHome('reviews.form.textPlaceholder')}
                rows={5}
                value={form.text}
                onChange={(e) => onChange('text', e.target.value)}
              />

              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => onChange('consent', e.target.checked)}
                  className="mt-1"
                />
                <span className="text-neutral-600">
                  {tHome('reviews.form.consent')}
                </span>
              </label>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="ghost" onClick={() => setOpen(false)}>{tHome('reviews.form.cancel')}</Button>
                <Button onClick={submit} disabled={sending}>
                  {sending ? tHome('reviews.form.sending') : tHome('reviews.form.submit')}
                </Button>
              </div>

              {sent === 'ok' ? (
                <p className="text-sm text-green-600">{tHome('reviews.form.success')}</p>
              ) : sent === 'err' ? (
                <p className="text-sm text-red-600">{tHome('reviews.form.error')}</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
