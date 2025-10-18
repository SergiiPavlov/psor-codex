// app/[locale]/layout.tsx
import type { ReactNode } from 'react';
import type { Locale } from '@/i18n';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ToastProvider } from '@/components/ui/toast-provider';
import { AnalyticsPlaceholder } from '@/components/AnalyticsPlaceholder';
import { cn } from '@/lib/utils';

export const runtime = 'edge';

// генерируем статические маршруты под доступные локали
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  // защита на случай некорректной локали
  if (!locales.includes(locale)) {
    notFound();
  }

  // обязательно фиксируем локаль для запроса и подтягиваем messages
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ToastProvider>
        {/* шапка */}
        <Header />
        {/* контент */}
        <main className={cn('min-h-[60vh]')}>{children}</main>
        {/* подвал */}
        <Footer />
        {/* плейсхолдер для аналитики из env */}
        <AnalyticsPlaceholder gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} placeholder="Analytics placeholder" />
      </ToastProvider>
    </NextIntlClientProvider>
  );
}
