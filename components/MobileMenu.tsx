'use client'
import Link from 'next/link'
import {useEffect} from 'react'
import {useLocale, useTranslations} from 'next-intl'
import {cn} from '@/lib/utils'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  currentPath: string
}

export default function MobileMenu({open, onClose, currentPath}: MobileMenuProps) {
  const t = useTranslations('nav')
  const common = useTranslations('common')
  const locale = useLocale()
  const primary = (t.raw('primary') as Array<{href: string; label: string; external?: boolean}>) || []

  useEffect(() => {
    const prev = document.body.style.overflow
    if (open) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  if (!open) return null

  return (
    <div role="dialog" aria-modal="true" aria-label={t('menu', {default: 'Menu'})} className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm xl:hidden" onClick={onClose}>
      <div className="container relative mx-auto max-w-screen-md p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xl font-bold">Psoriatinin</span>
          <button onClick={onClose} className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)]" aria-label={common('actions.close', {default: 'Close'})}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
        <nav className="space-y-2">
          {primary.map((item) => {
            const href = `/${locale}${item.href}`
            const active = currentPath === href
            return item.external ? (
              <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer"
                 className={cn('block rounded-xl px-4 py-3 text-lg font-medium', active ? 'bg-[var(--muted)] text-[var(--text-strong)]' : 'text-[var(--text)] hover:bg-[var(--muted)]')}
                 onClick={onClose}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={href}
                    className={cn('block rounded-xl px-4 py-3 text-lg font-medium', active ? 'bg-[var(--muted)] text-[var(--text-strong)]' : 'text-[var(--text)] hover:bg-[var(--muted)]')}
                    onClick={onClose}>
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link href={`/${locale}/order`} className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] px-4 py-3 text-base font-semibold" onClick={onClose}>{common('cta.order')}</Link>
          <Link href={`/${locale}/order`} className="inline-flex items-center justify-center rounded-xl bg-brand text-white px-4 py-3 text-base font-semibold" onClick={onClose}>{common('cta.buy')}</Link>
        </div>
      </div>
    </div>
  )
}
