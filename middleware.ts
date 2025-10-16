// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {locales, defaultLocale} from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

// Оборачиваем: для корня делаем 308 Permanent Redirect на дефолтную локаль
export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  if (url.pathname === '/') {
    url.pathname = '/uk'; // дефолтная локаль
    return NextResponse.redirect(url, 308);
  }
  return intlMiddleware(req);
}

// добавь api в исключения
export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };
