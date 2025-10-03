import Link from 'next/link'
import {useLocale} from 'next-intl'

export default function Footer(){
  const locale = useLocale()
  return (
    <footer className="border-t mt-16">
      <div className="container py-10 grid md:grid-cols-3 gap-6 text-sm text-gray-600">
        <div>
          <div className="font-semibold mb-2">Псориатинин</div>
          <p>Косметическое средство для ухода при псориазе.</p>
        </div>
        <div className="space-y-2">
          <Link href={`/${locale}/legal/privacy`} className="block hover:underline">Конфиденциальность</Link>
          <Link href={`/${locale}/legal/terms`} className="block hover:underline">Условия</Link>
          <Link href={`/${locale}/legal/cookies`} className="block hover:underline">Cookies</Link>
          <Link href={`/${locale}/legal/shipping-returns`} className="block hover:underline">Доставка и возвраты</Link>
        </div>
        <div className="text-gray-500">
          <p>Дисклеймер: информация на сайте не заменяет консультацию врача. Индивидуальные результаты различаются.</p>
        </div>
      </div>
    </footer>
  )
}
