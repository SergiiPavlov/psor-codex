'use client';

import {useCallback, useEffect, useMemo, useState} from 'react';
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
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const items: Array<{key: string; href: string}> = [
    {key: 'home', href: '/'},
    {key: 'catalog', href: '/catalog'},
    {key: 'how_it_works', href: '/how-it-works'},
    {key: 'ingredients', href: '/ingredients'},
    {key: 'results', href: '/results'},
    {key: 'about', href: '/brand'},
    {key: 'how_to_use', href: '/#how-to-apply'},
  ];

  const withLocale = (href: string) =>
    href === '/' ? `/${locale}` : `/${locale}${href}`;

  const anchorTargets = useMemo(() => ['how-to-apply', 'faq', 'contacts'], []);
  const isHome = pathname === `/${locale}`;

  const setSectionFromHash = useCallback(() => {
    if (!isHome) return;
    const hash = window.location.hash.replace('#', '');
    if (anchorTargets.includes(hash)) {
      setActiveSection(hash);
    } else {
      setActiveSection(null);
    }
  }, [anchorTargets, isHome]);

  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }

    setSectionFromHash();

    const handleScroll = () => {
      const offset = 160;
      let current: string | null = null;

      for (const id of anchorTargets) {
        const element = document.getElementById(id);
        if (!element) continue;
        const top = element.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY + offset >= top) {
          current = id;
        }
      }

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const handleHashChange = () => {
      requestAnimationFrame(setSectionFromHash);
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    window.addEventListener('hashchange', handleHashChange);

    requestAnimationFrame(handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [anchorTargets, isHome, setSectionFromHash]);

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
            const isAnchorLink = href.startsWith('/#');
            const sectionId = isAnchorLink ? href.split('#')[1] ?? null : null;
            const isHomeLink = href === '/';

            let active = false;
            if (isAnchorLink && sectionId) {
              active = isHome && activeSection === sectionId;
            } else if (isHomeLink) {
              active = pathname === url && (!isHome || activeSection === null);
            } else {
              active = url === pathname;
            }

            return (
              <Link
                key={key}
                href={url}
                onClick={() => {
                  if (sectionId) {
                    setActiveSection(sectionId);
                  } else if (isHomeLink) {
                    setActiveSection(null);
                  }
                }}
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
