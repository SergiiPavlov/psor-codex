export default function HowItWorks(){
  const steps = [
    {n:1, t:'Мягкое отшелушивание', d:'Помогает освобождать кожу от видимых чешуек.'},
    {n:2, t:'Успокаивающий уход', d:'Смягчение и комфорт для чувствительной кожи.'},
    {n:3, t:'Поддержка барьера', d:'Содействует восстановлению и защите барьера кожи.'}
  ]
  return (
    <section className="section">
      <h2 className="h2 mb-6">Как это работает</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map(s => (
          <div key={s.n} className="card">
            <div className="text-3xl font-bold mb-2">{s.n}</div>
            <div className="font-semibold mb-1">{s.t}</div>
            <div className="text-gray-600">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
