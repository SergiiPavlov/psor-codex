// middleware.ts
import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

// добавь api в исключения
export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };
