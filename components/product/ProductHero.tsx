import {BadgeList} from './BadgeList'

export type ProductHeroProps = {
  name: string
  label?: string
  description: string
  badges?: string[]
}

export function ProductHero({name, label, description, badges}: ProductHeroProps) {
  return (
    <section className="section pb-10">
      <div className="container space-y-6">
        {label ? <span className="badge-outline">{label}</span> : null}
        <h1 className="text-4xl font-semibold text-neutral-900 md:text-5xl">{name}</h1>
        <p className="max-w-2xl text-lg text-neutral-600">{description}</p>
        {badges ? <BadgeList items={badges} /> : null}
      </div>
    </section>
  )
}
