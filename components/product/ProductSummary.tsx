export function ProductSummary({title, points}: {title: string; points: string[]}) {
  return (
    <section className="section pt-0">
      <div className="container rounded-3xl border border-brand/20 bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-semibold text-neutral-900">{title}</h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-600">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-brand" aria-hidden />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
