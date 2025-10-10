'use client'

import Link from 'next/link'
import {useLocale, useTranslations} from 'next-intl'

export default function Footer() {
  const tCommon = useTranslations('common')
  const tFooter = useTranslations('footer')
  const tNav = useTranslations('nav')
  const locale = useLocale()
  const secondaryNav = tNav.raw('secondary') as Array<{href: string; label: string}>
  const contacts = tCommon.raw('contact') as Record<string, string>

  return (
    <footer id="contacts" className="border-t border-border bg-neutral-50/80">
      <div className="container grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-6">
          <Link href={`/${locale}`} className="text-xl font-semibold text-brand">
            <span className="inline-flex items-center gap-2"><img src="/icons/psoriatynin-logo.svg" alt="Псориатинин" className="h-5 w-5" />{tCommon('brand')}</span>
          </Link>
          <p className="text-sm text-neutral-600">{tFooter('about')}</p>
          <p className="text-xs text-neutral-500">{tFooter('disclaimer')}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-700">{tFooter('socialTitle')}</h3>
          <ul className="mt-4 space-y-2 text-sm text-neutral-600">
            <li>
              <a href="tg://resolve?phone=380667213166">Telegram</a><span className="mx-2">·</span><a href="https://wa.me/380667213166">WhatsApp</a><span className="mx-2">·</span><a href="viber://chat?number=%2B380667213166">Viber</a>
            </li>
            <li>
              <a href={`mailto:${contacts.email}`} className="transition hover:text-brand">
                Email
              </a>
            </li>
           
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-700">{tFooter('menuTitle')}</h3>
          <ul className="mt-4 space-y-2 text-sm text-neutral-600">
            {secondaryNav.map((item) => (
              <li key={item.href}>
                <Link href={`/${locale}${item.href}`} className="transition hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border bg-white/70">
        <div className="container flex flex-col gap-3 py-6 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>{tFooter('rights')}</p>
          <div className="space-y-1 md:text-right">
            <p>{tFooter('registration', { legal_info: process.env.NEXT_PUBLIC_LEGAL_INFO ?? '' })}</p>
            <p>
              {contacts.office} · {contacts.hours}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
