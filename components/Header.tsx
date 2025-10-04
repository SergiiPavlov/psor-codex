'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useLocale, useTranslations} from 'next-intl'
import {cn} from '@/lib/utils'
import LangSwitcher from './LangSwitcher'
import {Button} from './ui/button'

export default function Header() {
  const t = useTranslations('nav')
  const common = useTranslations('common')
  const locale = useLocale()
  const pathname = usePathname()
  const primaryNav = t.raw('primary') as Array<{href: string; label: string; external?: boolean}>

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur">
      <div className="container flex items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-8">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-lg font-semibold text-brand-dark focus-outline">
            <span className="h-10 w-10 rounded-2xl bg-brand-muted/80" aria-hidden />
            <span> {common('brand')} </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-700 xl:flex" aria-label="Primary">
            {primaryNav.map((item) => {
              const target = `/${locale}${item.href === '/' ? '' : item.href}`
              const isActive = item.href === '/' ? pathname === target : pathname?.startsWith(target)
              const baseClasses = 'transition hover:text-brand-dark focus-outline'
              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(baseClasses, isActive && 'text-brand-dark font-semibold')}
                  >
                    {item.label}
                  </a>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href === '/' ? '' : item.href}`}
                  className={cn(baseClasses, isActive && 'text-brand-dark font-semibold')}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <LangSwitcher />
          <Button
            href={`/${locale}/order`}
            variant="primary"
            className="hidden text-sm font-semibold md:inline-flex"
          >
            {common('cta.order')}
          </Button>
          <Button
            href={`/${locale}/order`}
            variant="primary"
            className="text-sm font-semibold xl:hidden"
          >
            {common('cta.buy')}
          </Button>
        </div>
      </div>
    </header>
  )
}
