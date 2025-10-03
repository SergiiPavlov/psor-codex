import {TextareaHTMLAttributes, forwardRef} from 'react'
import {cn} from '@/lib/utils'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({className, ...props}, ref) {
  return <textarea ref={ref} className={cn('form-textarea min-h-[120px]', className)} {...props} />
})

export {Textarea}
