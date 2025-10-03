# Псориатинин — сайт (Next.js 14, TypeScript, Tailwind, next-intl)

## Скрипты
```bash
npm i
npm run dev
npm run build && npm start
```

## Переменные окружения (.env)
Скопируйте `.env.example` в `.env` и заполните при необходимости:
- `NEXT_PUBLIC_SITE_URL`
- `ORDER_EMAIL_TO` (зарезервировано для будущей отправки писем)
- `SMTP_*` для nodemailer (опционально)
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — для получения заказов в Telegram

## Локализация
Маршруты с префиксом: `/uk`, `/ru`, `/en`. По умолчанию `uk` (см. `i18n.ts` и `middleware.ts`).

## Страницы
- `/[locale]` — главная (герой, преимущества, как работает, FAQ)
- `/[locale]/catalog` — каталог
- `/[locale]/product/[slug]` — карточка товара (`psoriatinin-cream`, `psoriatinin-cool`)
- `/[locale]/how-it-works`
- `/[locale]/ingredients`
- `/[locale]/results`
- `/[locale]/brand`
- `/[locale]/use-safely`
- `/[locale]/blog`
- `/[locale]/order` — форма заказа
- `/[locale]/contacts`
- `/[locale]/legal/*` — privacy, terms, cookies, shipping-returns

## API
- `POST /api/order` — принимает форму заказа и отправляет уведомление в Telegram (если заданы переменные).

## JSON-LD / SEO
Добавьте JSON-LD на страницах продуктов и FAQ при наполнении (можно отдельным компонентом).

## Дальнейшие шаги
- Заменить заглушки фото, текстов и цен.
- Подставить INCI и активы.
- Добавить реальные схемы оплаты/доставки.
- При необходимости — вынести форум на поддомен и подключить SSO.
