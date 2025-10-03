import Image from 'next/image'

export type ProductGalleryItem = {
  id: string
  label: string
  description: string
  url: string
}

export function ProductGallery({items}: {items: ProductGalleryItem[]}) {
  if (!items || items.length === 0) return null
  return (
    <section className="section pt-0">
      <div className="container grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="space-y-3">
            <div className="overflow-hidden rounded-3xl border border-brand/20 bg-white shadow-soft">
              <Image src={item.url || '/placeholder.svg'} alt={item.description} width={480} height={480} className="h-full w-full object-cover" />
            </div>
            <div className="space-y-1 text-sm text-neutral-600">
              <p className="font-semibold text-neutral-900">{item.label}</p>
              <p className="text-xs text-neutral-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
