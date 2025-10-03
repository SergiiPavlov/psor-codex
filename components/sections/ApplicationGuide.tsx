export type ApplicationStep = {
  title: string
  description: string
}

export function ApplicationGuide({
  title,
  disclaimer,
  steps,
  cautions,
  cautionTitle
}: {
  title: string
  disclaimer?: string
  steps: ApplicationStep[]
  cautions?: string[]
  cautionTitle?: string
}) {
  return (
    <section className="section bg-neutral-50/60">
      <div className="container space-y-10">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">{title}</h2>
          {disclaimer ? <p className="text-sm text-neutral-500">{disclaimer}</p> : null}
        </div>
        <div className="grid gap-8 md:grid-cols-[1fr_0.8fr]">
          <ol className="space-y-5">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-3xl border border-brand/20 bg-white p-6 shadow-soft">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand-dark">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.description}</p>
              </li>
            ))}
          </ol>
          {cautions && cautions.length > 0 ? (
            <div className="card-layered h-full space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">{cautionTitle ?? 'Safety reminders'}</h3>
              <ul className="space-y-3 text-sm leading-relaxed text-neutral-600">
                {cautions.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-brand-dark" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
