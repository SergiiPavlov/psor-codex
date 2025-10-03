export type TimelineItem = {
  title: string
  description: string
}

export function Timeline({title, items}: {title: string; items: TimelineItem[]}) {
  return (
    <section className="section bg-neutral-50/60">
      <div className="container space-y-10">
        <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">{title}</h2>
        <div className="timeline">
          {items.map((item) => (
            <div key={item.title} className="timeline-item">
              <div className="card-layered">
                <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
