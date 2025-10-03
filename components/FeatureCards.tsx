export default function FeatureCards(){
  const items = [
    {title:'Смягчение', desc:'Помогает уменьшить ощущение сухости и стянутости.'},
    {title:'Отшелушивание', desc:'Содействует удалению видимых чешуек.'},
    {title:'Барьер кожи', desc:'Поддерживает барьер кожи при регулярном использовании.'}
  ]
  return (
    <section className="section">
      <h2 className="h2 mb-6">Ключевые преимущества</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((i)=> (
          <div key={i.title} className="card">
            <div className="font-semibold mb-1">{i.title}</div>
            <div className="text-gray-600">{i.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
