import Script from 'next/script'

type Props = {
  gaId: string
  placeholder: string
}

export function AnalyticsPlaceholder({gaId, placeholder}: Props) {
  if (!gaId || gaId.includes('{{ga_id}}')) {
    return <div className="sr-only">{placeholder}</div>
  }

  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <Script id="ga4">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
