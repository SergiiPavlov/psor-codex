export type ApplicationStep = {
  title: string
  description: string
}

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function ApplicationGuide({
  title,
  disclaimer,
  steps,
  cautions,
  cautionTitle,
  id,
  docs
}: {
  title: string
  disclaimer?: string
  steps: ApplicationStep[]
  cautions?: string[]
  cautionTitle?: string
  id?: string
  docs?: { open: string; download: string }
}) {
  return (
    <section id={id ?? 'how-to-apply'} className="section">
      <div className="container">
        <h2 className="section__title">{title}</h2>
        {disclaimer ? (
          <p className="mt-2 text-sm text-muted-foreground">{disclaimer}</p>
        ) : null}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="rounded-2xl border bg-background p-4 shadow-sm">
                <h3 className="font-medium">{step.title}</h3>
                <p className="mt-1 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          {cautions?.length ? (
            <div className="rounded-2xl border bg-background p-4 shadow-sm">
              <h3 className="font-medium">{cautionTitle}</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                {cautions.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {docs ? (
          <div className="mt-6 flex flex-wrap gap-4">
            <Button asChild>
              <Link href={docs.open} target="_blank" rel="noopener">
                Открыть инструкцию (PDF)
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <a href={docs.download} download>
                Скачать PDF
              </a>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
