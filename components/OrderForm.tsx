'use client'

import { FormEvent, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast-provider'

export type OrderFormContent = {
  title: string
  description?: string
  fields: {
    name: string
    phone: string
    city: string
    warehouse: string
    product: string
    volume: string
    quantity: string
    comment: string
    consent: string
    guarantee: string
  }
  products: Array<{ value: string; label: string }>
  quantityOptions: string[] // оставил в типе, но в компоненте больше не используется
  submit: string
  success: { title: string; description: string }
  error: { title: string; description: string }
}

const INITIAL_STATE = {
  name: '',
  phone: '',
  city: '',
  warehouse: '',
  product: '',
  volume: '',
  quantity: '1',
  comment: '',
  consent: false,
  guarantee: false
}

type FormState = typeof INITIAL_STATE
type Errors = Partial<Record<keyof FormState, string>>

function validate(values: FormState, content: OrderFormContent): Errors {
  const errors: Errors = {}

  if (!values.name.trim()) errors.name = content.fields.name
  if (!values.phone.trim() || values.phone.replace(/[^\d+]/g, '').length < 10) {
    errors.phone = content.fields.phone
  }
  if (!values.city.trim()) errors.city = content.fields.city
  if (!values.warehouse.trim()) errors.warehouse = content.fields.warehouse
  if (!values.product) errors.product = content.fields.product

  // простая проверка количества: минимум 1
  const qty = Number(values.quantity)
  if (!Number.isFinite(qty) || qty < 1) {
    errors.quantity = content.fields.quantity
  }

  if (!values.consent) errors.consent = content.fields.consent
  if (!values.guarantee) errors.guarantee = content.fields.guarantee

  return errors
}

export function OrderForm({ content }: { content: OrderFormContent }) {
  const [values, setValues] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<Errors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const handleChange = (field: keyof FormState, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validate(values, content)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      if (!response.ok) {
        throw new Error('Failed request')
      }

      toast.push({
        title: content.success.title,
        description: content.success.description,
        variant: 'success'
      })
      setValues(INITIAL_STATE)
    } catch {
      toast.push({
        title: content.error.title,
        description: content.error.description,
        variant: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-neutral-900">{content.title}</h2>
        {content.description ? (
          <p className="text-sm text-neutral-600">{content.description}</p>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="form-label" htmlFor="name">
            {content.fields.name}
          </label>
          <Input
            id="name"
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
          {errors.name ? <p className="form-error">{errors.name}</p> : null}
        </div>

        <div>
          <label className="form-label" htmlFor="phone">
            {content.fields.phone}
          </label>
          <Input
            id="phone"
            value={values.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
          />
          {errors.phone ? <p className="form-error">{errors.phone}</p> : null}
        </div>

        <div>
          <label className="form-label" htmlFor="city">
            {content.fields.city}
          </label>
          <Input
            id="city"
            value={values.city}
            onChange={(e) => handleChange('city', e.target.value)}
            required
          />
          {errors.city ? <p className="form-error">{errors.city}</p> : null}
        </div>

        <div>
          <label className="form-label" htmlFor="warehouse">
            {content.fields.warehouse}
          </label>
          <Input
            id="warehouse"
            value={values.warehouse}
            onChange={(e) => handleChange('warehouse', e.target.value)}
            required
          />
          {errors.warehouse ? <p className="form-error">{errors.warehouse}</p> : null}
        </div>

        <div>
          <label className="form-label" htmlFor="product">
            {content.fields.product}
          </label>
          <Select
            id="product"
            value={values.product}
            onChange={(e) => handleChange('product', e.target.value)}
            required
          >
            <option value="" disabled>
              --
            </option>
            {content.products.map((product) => (
              <option key={product.value} value={product.value}>
                {product.label}
              </option>
            ))}
          </Select>
          {errors.product ? <p className="form-error">{errors.product}</p> : null}
        </div>

        <div>
          <label className="form-label" htmlFor="volume">
            {content.fields.volume}
          </label>
          <Select
            id="volume"
            value={values.volume}
            onChange={(e) => handleChange('volume', e.target.value)}
          >
            <option value="">--</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Select>
        </div>

        <div>
          <label className="form-label" htmlFor="quantity">
            {content.fields.quantity}
          </label>
          <Input
            id="quantity"
            type="number"
            inputMode="numeric"
            pattern="\d*"
            min={1}
            step={1}
            className="w-28"
            value={values.quantity}
            onChange={(e) => {
              // разрешаем только цифры; пустое значение допускаем, чтобы пользователь мог стереть и ввести заново
              const onlyDigits = e.target.value.replace(/[^\d]/g, '')
              handleChange('quantity', onlyDigits)
            }}
            required
          />
          {errors.quantity ? <p className="form-error">{errors.quantity}</p> : null}
        </div>

        <div className="md:col-span-2">
          <label className="form-label" htmlFor="comment">
            {content.fields.comment}
          </label>
          <Textarea
            id="comment"
            value={values.comment}
            onChange={(e) => handleChange('comment', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-start gap-3 text-sm text-neutral-700">
          <Checkbox
            checked={values.consent}
            onChange={(e) => handleChange('consent', e.target.checked)}
          />
          <span>{content.fields.consent}</span>
        </label>
        {errors.consent ? <p className="form-error">{errors.consent}</p> : null}

        <label className="flex items-start gap-3 text-sm text-neutral-700">
          <Checkbox
            checked={values.guarantee}
            onChange={(e) => handleChange('guarantee', e.target.checked)}
          />
          <span>{content.fields.guarantee}</span>
        </label>
        {errors.guarantee ? <p className="form-error">{errors.guarantee}</p> : null}
      </div>

      <Button type="submit" disabled={isSubmitting} className="px-8 py-3 text-base">
        {isSubmitting ? '…' : content.submit}
      </Button>
    </form>
  )
}
