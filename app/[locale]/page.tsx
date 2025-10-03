import Hero from '@/components/Hero'
import FeatureCards from '@/components/FeatureCards'
import HowItWorks from '@/components/HowItWorks'
import FAQAccordion from '@/components/FAQAccordion'

export default function HomePage() {
  return (
    <div className="space-y-12">
      <Hero />
      <FeatureCards />
      <HowItWorks />
      <section className="section">
        <FAQAccordion items={[
          {q:'Это лекарство?', a:'Нет. Это косметическое средство для ухода. Оно не предназначено для лечения заболеваний.'},
          {q:'Как быстро ожидается эффект?', a:'Опыт индивидуален. Обычно смягчение и комфорт ощущаются после первых применений.'},
          {q:'Можно ли применять вместе с терапией?', a:'Проконсультируйтесь с врачом. Информация на сайте не заменяет мед. рекомендации.'}
        ]}/>
      </section>
    </div>
  )
}
