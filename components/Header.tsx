'use client';

import {useState} from 'react';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname} from 'next/navigation';
import {Menu} from 'lucide-react';
import LangSwitcher from './LangSwitcher';
import MobileMenu from './MobileMenu';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);

  const items: Array<{key: string; href: string}> = [
    {key: 'home', href: '/'},
    {key: 'catalog', href: '/catalog'},
    {key: 'how_it_works', href: '/how-it-works'},
    {key: 'ingredients', href: '/ingredients'},
    {key: 'results', href: '/results'},
    {key: 'about', href: '/brand'},
    {key: 'how_to_use', href: '/how-to-use'},
  ];

  const withLocale = (href: string) =>
    href === '/' ? `/${locale}` : `/${locale}${href}`;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="container flex h-16 items-center justify-between gap-3">
        {/* ЛОГО */}
        <Link href={`/${locale}`} className="text-xl font-bold">
          Psoriatynin
        </Link>

        {/* Desktop-меню (только >= xl) */}
        <nav className="hidden xl:flex items-center gap-4">
          {items.map(({key, href}) => {
            const url = withLocale(href);
            const active = url === pathname;
            return (
              <Link
                key={key}
                href={url}
                className={`rounded-lg px-3 py-2 text-sm ${
                  active
                    ? 'bg-brand/10 text-brand font-medium'
                    : 'text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                {safeLabel(t, key)}
              </Link>
            );
          })}
        </nav>

        {/* Правый блок: переключатель языка + бургер на моб/планшете */}
        <div className="flex items-center gap-2">
          <LangSwitcher size="sm" />
          <button
            className="xl:hidden inline-flex items-center justify-center rounded-xl p-2 border border-border/70 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-brand"
            onClick={() => setOpen(true)}
            aria-label="Открыть меню"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <MobileMenu open={open} onClose={() => setOpen(false)} currentPath={pathname} />
    </header>
  );
}

function safeLabel(t: ReturnType<typeof useTranslations>, key: string) {
  try {
    return t(key);
  } catch {
    // если ключа нет — показываем key, чтобы не падать
    return key;
  }
}
