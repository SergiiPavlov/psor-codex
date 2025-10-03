'use client'
import {useState} from 'react'

export default function OrderPage() {
  const [status,setStatus] = useState<'idle'|'loading'|'ok'|'error'>('idle')
  async function onSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setStatus('loading')
    const res = await fetch('/api/order', {method:'POST', body: fd})
    setStatus(res.ok?'ok':'error')
  }
  return (
    <section className="section max-w-xl mx-auto">
      <h1 className="h1 mb-4">Оформление заказа</h1>
      <form onSubmit={onSubmit} className="space-y-4 card">
        <input name="name" placeholder="Имя" required className="w-full border rounded-xl p-3"/>
        <input name="phone" placeholder="Телефон" required className="w-full border rounded-xl p-3"/>
        <input name="city" placeholder="Город/Отделение" required className="w-full border rounded-xl p-3"/>
        <textarea name="comment" placeholder="Комментарий" className="w-full border rounded-xl p-3" rows={4}/>
        <button className="btn btn-primary" disabled={status==='loading'}>Отправить</button>
        {status==='ok' && <p className="text-green-600">Спасибо! Мы свяжемся с вами.</p>}
        {status==='error' && <p className="text-red-600">Ошибка отправки. Попробуйте позже.</p>}
      </form>
      <p className="mt-4 text-sm text-gray-500">Нажимая «Отправить», вы соглашаетесь с Политикой конфиденциальности и Условиями.</p>
    </section>
  )
}
