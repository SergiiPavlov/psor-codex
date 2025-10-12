// app/api/order/route.ts
import { NextResponse } from 'next/server'

// если на проекте включён Edge-runtime, можно удалить строку ниже
export const runtime = 'nodejs'

type OrderPayload = {
  name?: string
  phone?: string
  city?: string
  warehouse?: string
  product?: string
  volume?: string
  quantity?: string | number
  comment?: string
  // любые дополнительные поля, которые шлёт форма
  [key: string]: unknown
}

function asText(v: unknown) {
  if (v === null || v === undefined) return ''
  if (typeof v === 'string') return v
  try {
    return JSON.stringify(v)
  } catch {
    return String(v)
  }
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as OrderPayload

    // ENV
    const EMAIL_WEBHOOK = process.env.ORDER_EMAIL_WEBHOOK
    const TG_WEBHOOK = process.env.ORDER_TELEGRAM_WEBHOOK

    const TG_ENABLED =
      (process.env.ORDER_TELEGRAM_ENABLED ?? process.env.ORDER_TELEGRAM_ENABLED)?.toString().toLowerCase() === 'true'

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID

    // Подготавливаем запросы (мы отправляем в несколько мест)
    const requests: Promise<Response>[] = []

    // 1) если задан email-вебхук — шлём туда сырой payload
    if (EMAIL_WEBHOOK) {
      requests.push(
        fetch(EMAIL_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      )
    }

    // 2) если задан телеграм-вебхук — тоже шлём сырые данные (на случай своего внешнего обработчика)
    if (TG_WEBHOOK) {
      requests.push(
        fetch(TG_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      )
    }

    // 3) Прямая отправка в Telegram (вариант B)
    if (TG_ENABLED && BOT_TOKEN && CHAT_ID) {
      const text =
        `🆕 Новый заказ\n` +
        `— Имя: ${asText(payload.name) || '-'}\n` +
        `— Телефон: ${asText(payload.phone) || '-'}\n` +
        `— Город: ${asText(payload.city) || '-'}\n` +
        `— Отделение: ${asText(payload.warehouse) || '-'}\n` +
        `— Продукт: ${asText(payload.product) || '-'}\n` +
        `— Объём: ${asText(payload.volume) || '-'}\n` +
        `— Кол-во: ${asText(payload.quantity) || '-'}\n` +
        (payload.comment ? `— Комментарий: ${asText(payload.comment)}\n` : ``)

      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

      requests.push(
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // ВНИМАНИЕ: CHAT_ID должен быть ЧИСЛОВЫМ id (а не @username) и у бота должен быть диалог с вами
          body: JSON.stringify({ chat_id: CHAT_ID, text }),
        })
      )
    }

    // Если ничего не настроено — отвечаем ошибкой конфигурации
    if (requests.length === 0) {
      return NextResponse.json(
        { ok: false, error: 'No order endpoints configured (ORDER_* envs are empty).' },
        { status: 500 }
      )
    }

    // Выполняем ВСЕ, но не падаем, если один из них вернул ошибку
    const results = await Promise.allSettled(requests)

    const allFailed = results.every(
      (r) => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.ok)
    )

    if (allFailed) {
      // Соберём краткую диагностику
      const diag = results.map((r) =>
        r.status === 'rejected' ? `rejected: ${String(r.reason)}` : `status ${r.value.status}`
      )
      return NextResponse.json({ ok: false, error: 'All targets failed', details: diag }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
