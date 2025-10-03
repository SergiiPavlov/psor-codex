import {NextResponse} from 'next/server'

const REQUIRED_FIELDS = ['name', 'phone', 'city', 'warehouse', 'product'] as const

type OrderPayload = {
  name: string
  phone: string
  city: string
  warehouse: string
  product: string
  volume?: string
  quantity?: string
  comment?: string
  consent?: boolean
  guarantee?: boolean
}

function validate(payload: Partial<OrderPayload>) {
  const errors: Record<string, string> = {}
  for (const field of REQUIRED_FIELDS) {
    const value = payload[field]
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors[field] = 'Required'
    }
  }
  if (!payload.consent) errors.consent = 'Required'
  if (!payload.guarantee) errors.guarantee = 'Required'
  return errors
}

function formatMessage(payload: OrderPayload) {
  return `New order request\nName: ${payload.name}\nPhone: ${payload.phone}\nCity: ${payload.city}\nBranch: ${payload.warehouse}\nProduct: ${payload.product}\nVolume: ${payload.volume ?? ''}\nQuantity: ${payload.quantity ?? ''}\nComment: ${payload.comment ?? ''}`
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<OrderPayload>
    const errors = validate(body)
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({errors}, {status: 400})
    }

    const payload = body as OrderPayload
    const message = formatMessage(payload)

    const emailWebhook = process.env.ORDER_EMAIL_WEBHOOK
    const telegramWebhook = process.env.ORDER_TELEGRAM_WEBHOOK

    const promises: Promise<unknown>[] = []

    if (emailWebhook && !emailWebhook.includes('{{order_endpoints}}')) {
      promises.push(
        fetch(emailWebhook, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({subject: 'Psoriatinin — new order', message})
        }).catch(() => null)
      )
    }

    if (telegramWebhook && !telegramWebhook.includes('{{order_endpoints}}')) {
      promises.push(
        fetch(telegramWebhook, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({text: message})
        }).catch(() => null)
      )
    }

    if (promises.length > 0) {
      await Promise.all(promises)
    }

    return NextResponse.json({ok: true})
  } catch (error) {
    return NextResponse.json({error: 'Invalid request'}, {status: 400})
  }
}
