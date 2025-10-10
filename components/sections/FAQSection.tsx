import {Accordion} from '@/components/ui/accordion'

export type FAQItem = {
  question: string
  answer: string
}

export function FAQSection({title, items, id}: {title: string; items: FAQItem[]; id?: string}) {
  return (
    <section className="section" id={id}>
      <div className="container space-y-8">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">{title}</h2>
        </div>
        <Accordion
          items={items.map((item, index) => ({
            id: `${index}-${item.question.slice(0, 8)}`,
            title: item.question,
            content: item.answer
          }))}
        />
      </div>
    </section>
  )
}
