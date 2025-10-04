'use client';

import Link from 'next/link';
import {useEffect, useCallback} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {X} from 'lucide-react';

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  currentPath: string;
}

// Оболочка без хуков (условный рендер)
export default function MobileMenu({open, ...rest}: MobileMenuProps) {
  if (!open) return null;
  return <MobileMenuInner {...rest} />;
}

function MobileMenuInner({
  onClose,
  currentPath
}: Omit<MobileMenuProps, 'open'>) {
  const t = useTranslations('nav');
  const locale = useLocale();

  // Блокируем прокрутку body (и компенсируем исчезновение скроллбара)
  useEffect(() => {
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPr = body.style.paddingRight;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (sbw > 0) body.style.paddingRight = `${sbw}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPr;
    };
  }, []);

  // Закрытие по Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Клик по подложке
  const onOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onClose();
    },
    [onClose]
  );

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  // Навигация (без «Заказ» — он есть отдельной кнопкой на сайте)
  const items: Array<{key: string; href: string}> = [
    {key: 'home', href: '/'},
    {key: 'catalog', href: '/catalog'},
    {key: 'how_it_works', href: '/how-it-works'},
    {key: 'ingredients', href: '/ingredients'},
    {key: 'results', href: '/results'},
    {key: 'about', href: '/about'},
    {key: 'how_to_use', href: '/how-to-use'},
    {key: 'care_notes', href: '/care-notes'},
    {key: 'forum', href: '/forum'}
  ];

  const withLocale = (href: string) =>
    href === '/' ? `/${locale}` : `/${locale}${href}`;

  return (
    <div
      className="fixed inset-0 z-[1000] flex"
      role="dialog"
      aria-modal="true"
      onClick={onOverlayClick}
    >
      {/* Непрозрачный фон */}
      <div aria-hidden="true" className="absolute inset-0 bg-black" />

      {/* Сайдпанель */}
      <div
        className="ml-auto h-full w-[88%] max-w-[420px] bg-white shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={stop}
      >
        <div className="flex items-center justify-between gap-4 border-b border-border/60 p-4">
          <span className="text-lg font-semibold">
            {safeTranslate(t, 'menuTitle', 'Меню')}
          </span>
          <button
            onClick={onClose}
            aria-label={safeTranslate(t, 'close', 'Закрыть')}
            className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {items.map(({key, href}) => {
            const url = withLocale(href);
            const active = url === currentPath;
            return (
              <Link
                key={key}
                href={url}
                onClick={onClose}
                className={`block rounded-lg px-3 py-2 text-base ${
                  active
                    ? 'bg-brand/10 text-brand font-medium'
                    : 'text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                {safeTranslate(t, key, key)}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

// Безопасный перевод: если ключа нет — используем fallback, чтобы не ронять рендер
function safeTranslate(
  t: ReturnType<typeof useTranslations>,
  key: string,
  fallback: string
) {
  try {
    return t(key);
  } catch {
    return fallback;
  }
}
