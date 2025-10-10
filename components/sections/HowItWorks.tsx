export type Step = {
  title: string
  description: string
}

export function HowItWorks({title, subtitle, steps}: {title: string; subtitle?: string; steps: Step[]}) {
  return (
    <section className="section">
      <div className="container space-y-10">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">{subtitle}</p>
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">{title}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="card-layered">
              <div className="status-pill mb-4">{String(index + 1).padStart(2, '0')}</div>
              <h3 className="text-xl font-semibold text-neutral-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
