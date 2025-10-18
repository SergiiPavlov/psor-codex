// app/api/review/route.ts
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type ReviewPayload = {
  name: string
  age?: string
  city?: string
  productVersion?: string
  rating?: number
  text: string
}

function buildMessage(p: ReviewPayload, origin?: string) {
  const lines: string[] = []
  lines.push('📝 <b>Новый отзыв с сайта</b>')
  if (origin) lines.push(`🌐 <a href="${origin}">${origin}</a>`)
  lines.push('')
  if (p.name) lines.push(`👤 Имя: <b>${p.name}</b>`)
  if (p.age) lines.push(`🎂 Возраст: ${p.age}`)
  if (p.city) lines.push(`📍 Город: ${p.city}`)
  if (p.productVersion) lines.push(`🧴 Версия: ${p.productVersion}`)
  if (typeof p.rating === 'number') lines.push(`⭐ Оценка: ${'★'.repeat(Math.max(0, Math.min(5, p.rating)))} (${p.rating}/5)`)
  lines.push('')
  lines.push(`<i>${p.text}</i>`)
  return lines.join('\n')
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Partial<ReviewPayload>
    const payload: ReviewPayload = {
      name: String(data.name || '').trim(),
      age: data.age ? String(data.age) : undefined,
      city: data.city ? String(data.city) : undefined,
      productVersion: data.productVersion ? String(data.productVersion) : undefined,
      rating: typeof data.rating === 'number' ? data.rating : undefined,
      text: String(data.text || '').trim()
    }

    if (!payload.name || !payload.text) {
      return NextResponse.json({ ok: false, error: 'NAME_AND_TEXT_REQUIRED' }, { status: 400 })
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || undefined
    const message = buildMessage(payload, origin)

    const webhook = process.env.ORDER_TELEGRAM_WEBHOOK
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    // Prefer direct Telegram if credentials provided; otherwise try webhook
    let sent = false
    const errors: string[] = []

    if (botToken && chatId) {
      try {
        const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
        const res = await fetch(tgUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML', disable_web_page_preview: true })
        })
        if (!res.ok) throw new Error(`Telegram API responded ${res.status}`)
        const json = await res.json().catch(() => ({}))
        if (json && (json.ok === true || json.result)) sent = true
        else if (res.ok) sent = true
      } catch (e: any) {
        errors.push('TG:' + String(e?.message || e))
      }
    }

    if (!sent && webhook) {
      try {
        const res = await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'review', text: message })
        })
        if (!res.ok) throw new Error(`Webhook responded ${res.status}`)
        sent = true
      } catch (e: any) {
        errors.push('WH:' + String(e?.message || e))
      }
    }

    if (!sent) {
      return NextResponse.json({ ok: false, error: 'DELIVERY_FAILED', details: errors }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
