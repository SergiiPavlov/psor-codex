import {notFound} from 'next/navigation'
import ProductCard from '@/components/ProductCard'

const PRODUCTS = {
  'psoriatinin-cream': {
    name: 'Псориатинин Крем',
    slug: 'psoriatinin-cream',
    price: '*** UAH',
    features: ['Смягчает', 'Помогает уменьшить ощущение сухости', 'Поддерживает барьер кожи']
  },
  'psoriatinin-cool': {
    name: 'Псориатинин Крем Cool',
    slug: 'psoriatinin-cool',
    price: '*** UAH',
    features: ['Лёгкое охлаждение', 'Комфорт', 'Уход за кожей']
  }
} as const;

export default function Page({params}:{params:{slug:string}}) {
  const product = PRODUCTS[params.slug as keyof typeof PRODUCTS];
  if (!product) return notFound();
  return (
    <section className="section">
      <ProductCard product={product} />
    </section>
  )
}
