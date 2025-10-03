import '../globals.css'
import {NextIntlClientProvider} from 'next-intl'
import {notFound} from 'next/navigation'
import {locales, Locale} from '@/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export const metadata = {
  title: 'Псориатинин — официальный сайт',
  description: 'Косметическое средство для ухода при псориазе. Помогает смягчить кожу и поддерживать кожный барьер.'
}

export default async function RootLayout({
  children, params
}: {children: React.ReactNode, params: {locale: Locale}}) {
  const {locale} = params;
  if (!locales.includes(locale)) notFound();

  let messages: any;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (e) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="container">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
