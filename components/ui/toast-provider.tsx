'use client'

import {createContext, PropsWithChildren, useCallback, useContext, useMemo, useState} from 'react'
import {cn} from '@/lib/utils'

type Toast = {
  id: number
  title: string
  description?: string
  variant?: 'success' | 'error'
}

type ToastContextValue = {
  toasts: Toast[]
  push: (toast: Omit<Toast, 'id'>) => void
  dismiss: (id: number) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({children}: PropsWithChildren) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const push = useCallback((toast: Omit<Toast, 'id'>) => {
    setToasts((prev) => {
      const id = Date.now()
      return [...prev, {id, ...toast}]
    })
  }, [])

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const value = useMemo(() => ({toasts, push, dismiss}), [toasts, push, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="assertive" className="fixed bottom-6 right-6 z-50 flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn('toast', toast.variant === 'success' && 'toast-success', toast.variant === 'error' && 'toast-error')}
          >
            <div className="flex-1">
              <p className="font-semibold">{toast.title}</p>
              {toast.description ? <p className="mt-1 text-sm opacity-80">{toast.description}</p> : null}
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              className="text-xs font-semibold uppercase text-neutral-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return ctx
}
