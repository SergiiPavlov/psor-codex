'use client';

import {useEffect, useMemo, useCallback} from 'react';
import {createPortal} from 'react-dom';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {X} from 'lucide-react';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const buildHref = (locale: string, path: string) =>
  path === '/' ? `/${locale}` : `/${locale}${path}`;

const NAV_ITEMS: Array<{ key: string; path: string }> = [
  {key: 'home', path: '/'},
  {key: 'catalog', path: '/catalog'},
  {key: 'how_it_works', path: '/how-it-works'},
  {key: 'ingredients', path: '/ingredients'},
  {key: 'results', path: '/results'},
  {key: 'about', path: '/about'},
  {key: 'how_to_use', path: '/how-to-use'},
  {key: 'care_notes', path: '/care-notes'},
  {key: 'forum', path: '/forum'},
  // ВАЖНО: пункта "order" здесь нет — по твоему требованию
];

export default function MobileMenu({open, onClose}: MobileMenuProps) {
  const locale = useLocale();
  const tNav = useTranslations('nav');

  const safeT = useCallback(
    (key: string, fallback: string) => {
      try {
        return tNav(key);
      } catch {
        return fallback;
      }
    },
    [tNav]
  );

  // Блокируем прокрутку страницы, пока открыто меню
  useEffect(() => {
    if (!open) return;

    const {body} = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [open]);

  // Закрытие по Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const content = useMemo(() => {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-[100]">
        {/* Затемнённый фон — клик по нему закрывает меню */}
        <div
          className="absolute inset-0 bg-black/80"
          aria-hidden
          onClick={onClose}
        />

        {/* Панель меню */}
        <aside
          className="absolute right-0 top-0 h-full w-full max-w-[420px] bg-white shadow-xl flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          <header className="flex items-center justify-between p-4 border-b border-neutral-200">
            <h3 className="text-lg font-semibold">
              {safeT('menuTitle', 'Меню')}
            </h3>
            <button
              type="button"
              onClick={onClose}
              aria-label={safeT('close', 'Закрыть')}
              className="text-neutral-700 hover:bg-neutral-100 rounded-lg p-2 transition"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">{safeT('close', 'Закрыть')}</span>
            </button>
          </header>

          <nav className="p-4 overflow-y-auto">
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={buildHref(locale, item.path)}
                    className="block rounded-md px-3 py-2 text-neutral-800 hover:bg-neutral-100 transition"
                    onClick={onClose}
                  >
                    {safeT(item.key, item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA «Оформить заказ» */}
          <div className="p-4 mt-auto border-t border-neutral-200">
            <Link
              href={buildHref(locale, '/order')}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand px-5 font-medium text-white transition hover:bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-light"
              onClick={onClose}
            >
              {safeT('order_now', 'Оформить заказ')}
            </Link>
          </div>
        </aside>
      </div>
    );
  }, [open, onClose, locale, tNav, safeT]);

  if (!open) return null;

  return createPortal(content, document.body);
}
