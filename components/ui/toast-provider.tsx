// components/ui/toast-provider.tsx
'use client';

import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

type Toast = { id: number; title: string; description?: string; variant?: 'success' | 'error' };
type ToastContextValue = { toasts: Toast[]; push: (t: Omit<Toast, 'id'>) => void; dismiss: (id: number) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((toast: Omit<Toast, 'id'>) => {
    setToasts((prev) => [...prev, { ...toast, id: Date.now() + Math.random() }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* контейнер всплывашек */}
      <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            aria-live="polite"
            className={cn(
              'rounded-lg border px-4 py-3 shadow-sm bg-white',
              t.variant === 'success' && 'border-emerald-300',
              t.variant === 'error' && 'border-rose-300'
            )}
          >
            <div className="text-sm font-medium">{t.title}</div>
            {t.description && <div className="text-xs text-neutral-600 mt-1">{t.description}</div>}
            <button
              className="mt-2 text-xs text-neutral-500 underline"
              onClick={() => dismiss(t.id)}
              aria-label="Закрыть уведомление"
            >
              Закрыть
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
