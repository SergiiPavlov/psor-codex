'use client';

import {useEffect, useMemo, useCallback} from 'react';
import {createPortal} from 'react-dom';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {X} from 'lucide-react';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  currentPath?: string; // допустим проп, если его передают
};

const buildHref = (locale: string, path: string) =>
  path === '/' ? `/${locale}` : `/${locale}${path}`;

const NAV_ITEMS: Array<{ key: string; path: string }> = [
  {key: 'home', path: '/'},
  {key: 'catalog', path: '/catalog'},
  {key: 'how_it_works', path: '/how-it-works'},
  {key: 'ingredients', path: '/ingredients'},
  {key: 'results', path: '/results'},
  {key: 'about', path: '/brand'},
  {key: 'how_to_use', path: '/#how-to-apply'},
  {key: 'faq', path: '/#faq'},
  {key: 'contacts', path: '/contacts'},
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

  // Блокируем скролл страницы, пока меню открыто
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
    return (
      <div className="fixed inset-0 z-[60]">
        {/* Подложка */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
          aria-hidden="true"
        />
        {/* Шторка */}
        <aside className="absolute right-0 top-0 flex h-full w-[min(92vw,380px)] flex-col bg-white shadow-xl">
          {/* Шапка меню */}
          <header className="flex items-center justify-between border-b border-neutral-200 p-4">
            <h3 className="text-base font-medium">{safeT('menuTitle', 'Меню')}</h3>
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
              href={`/${locale}/order`}
              className="inline-flex w-full items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:opacity-90"
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