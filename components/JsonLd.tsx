import Script from 'next/script'

type JsonLdProps = {
  data: Record<string, any>
  id: string
}

export function JsonLd({data, id}: JsonLdProps) {
  return <Script id={id} type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />
}
