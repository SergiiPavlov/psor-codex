import {InputHTMLAttributes, forwardRef} from 'react'
import {cn} from '@/lib/utils'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({className, ...props}, ref) {
  return (
    <input
      ref={ref}
      type="checkbox"
      className={cn('h-4 w-4 rounded border border-neutral-300 text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50', className)}
      {...props}
    />
  )
})

export {Checkbox}
