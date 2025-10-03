import '../globals.css'
import {NextIntlClientProvider} from 'next-intl'
import {notFound} from 'next/navigation'
import {locales, Locale} from '@/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {ToastProvider} from '@/components/ui/toast-provider'
import {CookieBanner} from '@/components/CookieBanner'
import {AnalyticsPlaceholder} from '@/components/AnalyticsPlaceholder'

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
    messages = (await import(`../../messages/${locale}`)).default;
  } catch (e) {
    notFound();
  }

  const analyticsPlaceholder = messages.analytics?.placeholder ?? ''
  const gaId = messages.common?.placeholders?.gaId ?? ''
  const cookie = messages.cookieBanner

  return (
    <html lang={locale}>
      <body className="bg-neutral-50 text-neutral-900">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ToastProvider>
            <AnalyticsPlaceholder gaId={gaId} placeholder={analyticsPlaceholder} />
            <a id="skip-nav" href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg">
              Skip to content
            </a>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <CookieBanner
              title={cookie?.title ?? ''}
              description={cookie?.description ?? ''}
              accept={cookie?.accept ?? 'Accept'}
              decline={cookie?.decline ?? 'Decline'}
            />
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
