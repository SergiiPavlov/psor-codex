import {SelectHTMLAttributes, forwardRef} from 'react'
import {cn} from '@/lib/utils'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({className, children, ...props}, ref) {
  return (
    <select ref={ref} className={cn('form-select', className)} {...props}>
      {children}
    </select>
  )
})

export {Select}
