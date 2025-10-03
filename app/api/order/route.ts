import {NextRequest, NextResponse} from 'next/server'

async function sendTelegram(text:string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chat = process.env.TELEGRAM_CHAT_ID
  if (!token || !chat) return false
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({chat_id: chat, text})
    })
    return res.ok
  } catch { return false }
}

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const name = String(form.get('name')||'')
  const phone = String(form.get('phone')||'')
  const city = String(form.get('city')||'')
  const comment = String(form.get('comment')||'')

  const text = `Новый заказ:\nИмя: ${name}\nТелефон: ${phone}\nГород: ${city}\nКомментарий: ${comment}`
  await sendTelegram(text)
  return NextResponse.json({ok:true})
}
