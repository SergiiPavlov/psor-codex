export type LegalSection = {
  title: string
  body: string
}

export function LegalArticle({title, intro, sections}: {title: string; intro: string; sections: LegalSection[]}) {
  return (
    <div className="space-y-10 pb-20">
      <section className="section">
        <div className="container space-y-4">
          <h1 className="text-4xl font-semibold text-neutral-900 md:text-5xl">{title}</h1>
          <p className="max-w-3xl text-lg text-neutral-600">{intro}</p>
        </div>
      </section>
      <section className="container space-y-6">
        {sections.map((section) => (
          <article key={section.title} className="card-layered space-y-3">
            <h2 className="text-2xl font-semibold text-neutral-900">{section.title}</h2>
            <p className="text-sm leading-relaxed text-neutral-600">{section.body}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
