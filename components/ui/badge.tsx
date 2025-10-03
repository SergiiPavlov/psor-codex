import {PropsWithChildren} from 'react'
import {cn} from '@/lib/utils'

type BadgeVariant = 'soft' | 'outline'

type BadgeProps = PropsWithChildren<{className?: string; variant?: BadgeVariant}>

export function Badge({children, className, variant = 'soft'}: BadgeProps) {
  return (
    <span className={cn(variant === 'soft' ? 'badge-soft' : 'badge-outline', className)}>
      {children}
    </span>
  )
}
