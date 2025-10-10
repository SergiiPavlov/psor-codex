'use client';

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname} from 'next/navigation';
import {Menu} from 'lucide-react';
import LangSwitcher from './LangSwitcher';
import MobileMenu from './MobileMenu';

export default function Header() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState<string>(() => (typeof window !== 'undefined' ? window.location.hash : ''));
  // следим за якорем URL, чтобы подсветка меню работала для #faq/#contacts
  useEffect(() => {
    const handler = () => setHash(window.location.hash);
    handler(); // первичная синхронизация
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const items: Array<{key: string; href: string}> = [
    {key: 'home', href: '/'},
    {key: 'catalog', href: '/catalog'},
    {key: 'how_it_works', href: '/how-it-works'},
    {key: 'ingredients', href: '/ingredients'},
    {key: 'results', href: '/results'},
    {key: 'about', href: '/brand'},
    {key: 'how_to_use', href: '/#how-to-apply'},
    {key: 'faq', href: '/#faq'},
    {key: 'contacts', href: '/#contacts'},
  ];

  // Определяем один-единственный активный пункт
  const getCurrentActive = () => {
    // anchors we care about on home
    const anchorMap: Record<string, string> = {
      '/#how-to-apply': '#how-to-apply',
      '/#faq': '#faq',
      '/#contacts': '#contacts',
    };
    const rootPath = `/${locale}`;
    const onRoot = pathname === rootPath || pathname === `${rootPath}/`;
    if (onRoot) {
      // при наличии якоря подсвечиваем только соответствующий пункт
      if (hash && Object.values(anchorMap).includes(hash)) {
        switch (hash) {
          case '#how-to-apply':
            return 'how_to_use';
          case '#faq':
            return 'faq';
          case '#contacts':
            return 'contacts';
        }
      }
      // иначе — главная
      return 'home';
    }
    // для остальных страниц — по совпадению пути
    for (const {key, href} of items) {
      const mk = (p: string) => (p === '/' ? `/${locale}` : `/${locale}${p}`);
      if (!href.startsWith('/#') && mk(href) === pathname) return key;
    }
    return null;
  };

  const currentActive = getCurrentActive();

  const handleAnchorClick = (href: string) => () => {
    const target = href.replace('/', '');
    setHash(target);
    if (typeof window !== 'undefined' && window.location.hash != target) {
      try { history.replaceState(null, '', target); } catch {}
    }
  };


  const withLocale = (href: string) =>
    href === '/' ? `/${locale}` : `/${locale}${href}`;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="container flex h-16 items-center justify-between gap-3">
        {/* ЛОГО */}
        <Link href={`/${locale}`} className="flex items-center gap-2 text-xl font-bold">
          <img src="/icons/psoriatynin-logo.svg" alt="Псориатинин" className="h-6 w-6" />
          <span>{tCommon('brand')}</span>
        </Link>

        {/* Desktop-меню (только >= xl) */}
        <nav className="hidden xl:flex items-center gap-4">
          {items.map(({key, href}) => {
            const url = withLocale(href);
            const active = key === currentActive;
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
