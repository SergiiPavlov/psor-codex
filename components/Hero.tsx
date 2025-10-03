import Link from 'next/link'
import {useLocale} from 'next-intl'

export default function Hero(){
  const locale = useLocale()
  return (
    <section className="section grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="h1 mb-4">Заботливый уход при псориазе</h1>
        <p className="p mb-6">Крем для ежедневного применения. Помогает смягчить кожу, уменьшить ощущение сухости и поддержать барьер кожи.</p>
        <div className="flex gap-3">
          <Link className="btn btn-primary" href={`/${locale}/order`}>Купить сейчас</Link>
          <Link className="btn" href={`/${locale}/catalog`}>Каталог</Link>
        </div>
        <div className="mt-6 flex gap-2">
          <span className="badge">Без отдушек*</span>
          <span className="badge">Dermatologist tested*</span>
        </div>
        <p className="mt-2 text-xs text-gray-500">*Подтверждения и сертификаты будут опубликованы на странице «Сертификаты и испытания».</p>
      </div>
      <div className="card h-64 md:h-80 flex items-center justify-center">
        <span className="text-gray-400">[Фото продукта — заглушка]</span>
      </div>
    </section>
  )
}
