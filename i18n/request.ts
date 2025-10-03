// i18n/request.ts
import {getRequestConfig} from 'next-intl/server';

// Перечень локалей держим как у тебя: uk / ru / en
export default getRequestConfig(async ({locale}) => {
  const messages = (await import(`../messages/${locale}`)).default;
  return {messages};
});
