'use client';

import {useState, useEffect, useRef} from 'react';
import {useLocale} from 'next-intl';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {Languages, ChevronDown} from 'lucide-react';

type Locale = 'uk' | 'ru' | 'en';

const LOCALES: Array<{code: Locale; label: string}> = [
  {code: 'uk', label: 'uk'},
  {code: 'ru', label: 'ru'},
  {code: 'en', label: 'en'}
];

interface LangSwitcherProps {
  /** размер/вид кнопки, если нужно менять стили */
  size?: 'sm' | 'md';
}

export default function LangSwitcher({size = 'sm'}: LangSwitcherProps) {
  const current = useLocale() as Locale;
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Клик вне — закрыть
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;
      if (!btnRef.current?.contains(t) && !menuRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  // Esc — закрыть
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const btnBase =
    'inline-flex items-center gap-2 rounded-lg border border-border/70 bg-white px-3 py-2 text-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-brand';

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={btnBase + (size === 'sm' ? ' text-xs py-1 px-2' : '')}
      >
        <span className="text-xs lowercase">
          {LOCALES.find((l) => l.code === current)?.label ?? current}
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          className="absolute left-0 mt-2 w-24 overflow-hidden rounded-xl border border-border/70 bg-white shadow-soft z-[60]"
        >
          {LOCALES.map(({code, label}) => {
            // Перекладываем префикс локали в URL
            const parts = pathname.split('/');
            parts[1] = code;
            const href = parts.join('/') || '/';
            const active = code === current;

            return (
              <Link
                key={code}
                href={href}
                onClick={() => setOpen(false)}
                role="menuitem"
                className={`block px-3 py-2 text-sm ${
                  active
                    ? 'bg-brand/10 text-brand font-medium'
                    : 'hover:bg-neutral-100 text-neutral-800'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
