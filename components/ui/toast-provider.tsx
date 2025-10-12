// components/ui/toast-provider.tsx
'use client'

import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

type Toast = { id: number; title: string; description?: string; variant?: 'success' | 'error' }
type ToastContextValue = { toasts: Toast[]; push: (t: Omit<Toast, 'id'>) => void; dismiss: (id: number) => void }

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const tNav = useTranslations('nav')

  const push = useCallback((toast: Omit<Toast, 'id'>) => {
    setToasts((prev) => [...prev, { ...toast, id: Date.now() + Math.random() }])
  }, [])

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const value = useMemo<ToastContextValue>(() => ({ toasts, push, dismiss }), [toasts, push, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Overlay container — centered */}
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center p-4',
          toasts.length ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {/* semi-transparent backdrop to focus attention; click-through disabled so buttons work */}
        {toasts.length > 0 && (
          <div className="absolute inset-0 bg-black/30" />
        )}

        {/* Stack of toasts in the center */}
        <div className="relative flex w-full max-w-lg flex-col items-stretch gap-4">
          {toasts.map((toast) => {
            const isSuccess = toast.variant !== 'error'
            return (
              <div
                key={toast.id}
                className={cn(
                  // card base
                  'relative mx-auto w-full animate-fadeIn rounded-2xl border shadow-xl',
                  'p-6 sm:p-7',
                  // mint success vs soft red error
                  isSuccess
                    ? 'bg-[#d7f5ea] border-[#b6ebd9] text-emerald-900'
                    : 'bg-[#fee2e2] border-[#fecaca] text-red-900'
                )}
                role="status"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold leading-tight">{toast.title}</h3>
                  {toast.description ? (
                    <p className="text-base/6 opacity-90">{toast.description}</p>
                  ) : null}
                </div>

                <div className="mt-5 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => dismiss(toast.id)}
                    className={cn(
                      'inline-flex min-w-24 items-center justify-center rounded-xl px-4 py-2 text-base font-medium',
                      isSuccess
                        ? 'bg-white/70 hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500'
                        : 'bg-white/80 hover:bg-white focus:outline-none focus:ring-2 focus:ring-red-500'
                    )}
                  >
                    {tNav('close')}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
