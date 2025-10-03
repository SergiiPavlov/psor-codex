import {Button} from '@/components/ui/button'

export function CallToActionStrip({
  title,
  subtitle,
  cta
}: {
  title: string
  subtitle?: string
  cta?: {label: string; href: string}
}) {
  return (
    <section className="py-12">
      <div className="container">
        <div className="gradient-border">
          <div className="grid gap-6 rounded-3xl px-8 py-10 md:grid-cols-[1.4fr_0.6fr] md:items-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-neutral-900 md:text-3xl">{title}</h2>
              {subtitle ? <p className="text-sm text-neutral-600">{subtitle}</p> : null}
            </div>
            {cta ? (
              <div className="flex justify-end">
                <Button href={cta.href} className="px-8 py-3 text-base">
                  {cta.label}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
