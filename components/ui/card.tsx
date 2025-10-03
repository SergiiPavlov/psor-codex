import {PropsWithChildren} from 'react'
import {cn} from '@/lib/utils'

type CardProps = PropsWithChildren<{className?: string; padding?: 'none' | 'sm' | 'md' | 'lg'}>

const paddingMap = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
} as const

export function Card({children, className, padding = 'md'}: CardProps) {
  return <div className={cn('rounded-3xl border border-[var(--border)] bg-white shadow-soft', paddingMap[padding], className)}>{children}</div>
}
