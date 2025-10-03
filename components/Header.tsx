'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useLocale} from 'next-intl'
import LangSwitcher from './LangSwitcher'

const nav = [
  {href:'/', label:'Главная'},
  {href:'/catalog', label:'Каталог'},
  {href:'/how-it-works', label:'Как это работает'},
  {href:'/ingredients', label:'Состав'},
  {href:'/results', label:'Результаты'},
  {href:'/brand', label:'О бренде'},
  {href:'/use-safely', label:'Как применять'},
  {href:'/order', label:'Заказ'}
]

export default function Header(){
  const locale = useLocale()
  const pathname = usePathname()
  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <div className="container flex items-center justify-between py-4">
        <Link href={`/${locale}`} className="font-bold">Псориатинин</Link>
        <nav className="hidden md:flex gap-6">
          {nav.map(i => (
            <Link key={i.href} href={`/${locale}${i.href}`} className="text-sm hover:underline">
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitcher/>
          <Link href={`/${locale}/order`} className="btn btn-primary">Купить</Link>
        </div>
      </div>
    </header>
  )
}
