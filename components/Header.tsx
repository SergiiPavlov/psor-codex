'use client';

import {useEffect, useMemo, useState} from 'react';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname} from 'next/navigation';
import {Menu} from 'lucide-react';
import LangSwitcher from './LangSwitcher';
import MobileMenu from './MobileMenu';

type NavItem = {key: string; href: string};

export default function Header() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);

  // Добавили недостающие пункты и якорь-страницы.
  const items: NavItem[] = [
    {key: 'home', href: '/'},
    {key: 'catalog', href: '/catalog'},
    {key: 'how_it_works', href: '/how-it-works'},
    {key: 'ingredients', href: '/ingredients'},
    {key: 'results', href: '/results'},
    {key: 'about', href: '/brand'},
    {key: 'how_to_use', href: '/#how-to-apply'}, // якорь на главной
    {key: 'faq', href: '/#faq'},                 // якорь на главной
    {key: 'contacts', href: '/contacts'},        // отдельная страница
  ];

  const withLocale = (href: string) =>
    href === '/' ? `/${locale}` : `/${locale}${href}`;

  // Следим за hash, чтобы корректно подсвечивать якорные разделы на главной.
  const [hash, setHash] = useState<string>('');
  useEffect(() => {
    const set = () => setHash(window.location.hash || '');
    set();
    window.addEventListener('hashchange', set);
    window.addEventListener('popstate', set);
    return () => {
      window.removeEventListener('hashchange', set);
      window.removeEventListener('popstate', set);
    };
  }, []);

  // Вычисляем текущий активный ключ с учётом pathname и hash (для якорей).
  const activeKey = useMemo(() => {
    // Нормализуем путь без locale префикса: /ru/contacts -> /contacts
    const normalized = pathname.replace(/^\/[a-z]{2}(?=\/|$)/i, '').replace(/^$/, '/');

    // Маршруты-страницы:
    if (normalized === '/catalog') return 'catalog';
    if (normalized === '/how-it-works') return 'how_it_works';
    if (normalized === '/ingredients') return 'ingredients';
    if (normalized === '/results') return 'results';
    if (normalized === '/brand') return 'about';
    if (normalized === '/contacts') return 'contacts';

    // Главная страница + якоря:
    if (normalized === '/') {
      if (hash === '#how-to-apply') return 'how_to_use';
      if (hash === '#faq') return 'faq';
      return 'home';
    }

    // Фолбэк
    return 'home';
  }, [pathname, hash]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="container flex h-16 items-center justify-between gap-3">
        {/* ЛОГО */}
        <Link href={`/${locale}`} className="flex items-center gap-2 text-xl font-bold mr-2 md:mr-3">
          <img src="/icons/psoriatynin-logo.svg" alt="Псориатинин" className="h-6 w-6" />
          <span>{tCommon('brand')}</span>
        </Link>

        {/* Desktop-меню (только >= xl) */}
        <nav className="hidden xl:flex items-center gap-2">
          {items.map(({key, href}) => {
            const url = withLocale(href);
            const active = key === activeKey;
            return (
              <Link
                key={key}
                href={url}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
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

        {/* Правый блок: «Заказать» + переключатель языка + бургер */}
        <div className="ml-auto flex items-center gap-2">
          <Link
            href={`/${locale}/order`}
            className="hidden md:inline-flex rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            {t('order_now')}
          </Link>

          <LangSwitcher size="sm" />

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 xl:hidden"
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