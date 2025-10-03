type P = {product:{name:string, slug:string, price:string, features:string[]}};
export default function ProductCard({product}:P){
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="card h-64 md:h-96 flex items-center justify-center">
        <span className="text-gray-400">[Галерея товара — заглушка]</span>
      </div>
      <div>
        <h1 className="h1 mb-2">{product.name}</h1>
        <div className="text-xl mb-4">{product.price}</div>
        <ul className="list-disc list-inside space-y-1 mb-6">
          {product.features.map(f => <li key={f}>{f}</li>)}
        </ul>
        <a href="/uk/order" className="btn btn-primary">Купить</a>
      </div>
    </div>
  )
}
