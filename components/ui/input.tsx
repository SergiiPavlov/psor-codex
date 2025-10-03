import {InputHTMLAttributes, forwardRef} from 'react'
import {cn} from '@/lib/utils'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({className, ...props}, ref) {
  return <input ref={ref} className={cn('form-input', className)} {...props} />
})

export {Input}
