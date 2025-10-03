export function ProductLogistics({
  title,
  delivery,
  payment,
  guarantee,
  labels
}: {
  title: string
  delivery: string
  payment: string
  guarantee: string
  labels: {delivery: string; payment: string; guarantee: string}
}) {
  return (
    <section className="section pt-0">
      <div className="container space-y-6">
        <h2 className="text-2xl font-semibold text-neutral-900">{title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card-layered space-y-3">
            <h3 className="text-lg font-semibold text-neutral-900">{labels.delivery}</h3>
            <p className="text-sm text-neutral-600">{delivery}</p>
          </div>
          <div className="card-layered space-y-3">
            <h3 className="text-lg font-semibold text-neutral-900">{labels.payment}</h3>
            <p className="text-sm text-neutral-600">{payment}</p>
          </div>
          <div className="card-layered space-y-3">
            <h3 className="text-lg font-semibold text-neutral-900">{labels.guarantee}</h3>
            <p className="text-sm text-neutral-600">{guarantee}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
