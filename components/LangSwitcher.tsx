'use client'

import Link from 'next/link'
import {useLocale} from 'next-intl'
import {usePathname} from 'next/navigation'
import {locales, Locale} from '@/i18n'
import {cn} from '@/lib/utils'

export default function LangSwitcher() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const pathWithoutLocale = pathname?.replace(/^\/(uk|ru|en)/, '') ?? ''

  return (
    <div className="flex items-center gap-1 rounded-full border border-brand/20 bg-brand-muted/40 p-1 text-xs font-semibold uppercase tracking-wide">
      {locales.map((item) => (
        <Link
          key={item}
          href={`/${item}${pathWithoutLocale || ''}`}
          className={cn(
            'rounded-full px-3 py-1 transition focus-outline',
            item === locale ? 'bg-white text-brand-dark shadow-sm' : 'text-neutral-500 hover:text-brand-dark'
          )}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
