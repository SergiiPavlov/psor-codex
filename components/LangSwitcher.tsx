'use client'
import {locales, Locale} from '@/i18n'
import {useLocale} from 'next-intl'
import {usePathname} from 'next/navigation'
import Link from 'next/link'

export default function LangSwitcher(){
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const pathNoLocale = pathname?.replace(/^\/(uk|ru|en)/,'') || ''
  return (
    <div className="flex gap-2 text-sm">
      {locales.map(l => (
        <Link key={l} href={`/${l}${pathNoLocale}`} className={l===locale? 'underline font-semibold':'hover:underline'}>
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
