import {ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react'
import Link from 'next/link'
import {cn} from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type BaseProps = {
  variant?: ButtonVariant
  asChild?: boolean
  href?: string
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>

type LinkButtonProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark focus-visible:ring-brand-dark',
  secondary: 'bg-white text-brand-dark border border-brand/40 hover:bg-brand-muted/60',
  ghost: 'bg-transparent text-brand-dark hover:bg-brand-muted/40'
}

export function Button({variant = 'primary', className, href, asChild, ...props}: ButtonProps & LinkButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          'inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
          variantClasses[variant],
          className
        )}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    )
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        variantClasses[variant],
        className
      )}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  )
}
