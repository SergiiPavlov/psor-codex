# Псориатинин — многоязычный сайт ухода при псориазе

Next.js 14 (App Router) + TypeScript + Tailwind CSS + next-intl. Вёрстка адаптивна под 1440/768/320 и использует дизайн-токены бренда.

## Быстрый старт

```bash
npm install
npm run dev
```

- `npm run build && npm start` — production-сборка.
- Перед запуском скопируйте `.env.example` в `.env` и заполните значения (см. ниже).

## Переменные окружения

| Ключ | Назначение |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Публичный домен сайта (`https://example.com`). |
| `ORDER_EMAIL_WEBHOOK` | Webhook/endpoint, принимающий JSON с полями `subject`, `message` (например, no-code сервис почтовой рассылки). |
| `ORDER_TELEGRAM_WEBHOOK` | Webhook, принимающий JSON `{text}` (например, собственный proxy к Telegram Bot API). |

Все ключи сейчас заполнены плейсхолдерами `{{…}}` — замените при подготовке к продакшену.

## Архитектура и ключевые модули

- `app/[locale]` — все страницы с префиксом локали (`uk`, `ru`, `en`).
  - Главная, каталог, карточки продуктов, блог, результаты, бренд, безопасное использование, контакты, оформление заказа и юридические страницы.
  - API `/api/order` принимает JSON формы, валидирует и отправляет payload в указанные вебхуки (почта/Telegram).
- `messages/*.ts` — контент и копирайт для всех языков. Плейсхолдеры `{{sizes_and_prices}}`, `{{inci_and_actives}}`, `{{assets_links}}`, `{{order_endpoints}}`, `{{legal_info}}`, `{{ga_id}}` оставлены намеренно.
- `components/sections/*`, `components/product/*`, `components/ui/*` — библиотека переиспользуемых блоков (Hero, FAQ, галерея, OrderForm и пр.). Компоненты реализованы в стиле shadcn/ui без дополнительных зависимостей.
- `app/sitemap.ts`, `app/robots.ts` — статичные sitemap и robots с учётом локалей.

## Локализация

- Используется `next-intl` c middleware для префиксов `/uk`, `/ru`, `/en`.
- Строки/структуры данных находятся в `messages`. При добавлении нового контента дублируйте ключи во всех файлах.

## SEO и аналитика

- JSON-LD для продуктов, FAQ и статей генерируется компонентом `JsonLd`.
- Плейсхолдер Google Analytics подключён через `AnalyticsPlaceholder` (вставьте реальный `GA4 ID`).
- Sitemap/robots генерируются автоматически.

## Отправка заказа

`POST /api/order`

```json
{
  "name": "...",
  "phone": "+380...",
  "city": "...",
  "warehouse": "...",
  "product": "psoriatinin-cream",
  "volume": "опционально",
  "quantity": "1",
  "comment": "опционально",
  "consent": true,
  "guarantee": true
}
```

Ответ `200 {"ok": true}` при успехе, `400 {errors}` при валидационных ошибках. Сервер отправляет текстовую сводку в указанные вебхуки, но не зависит от конкретного провайдера.

## TODO / что заменить

- Заменить плейсхолдеры `{{sizes_and_prices}}`, `{{inci_and_actives}}`, `{{assets_links}}`, `{{order_endpoints}}`, `{{legal_info}}`, `{{ga_id}}` на реальные данные.
- Подставить финальные фотографии/рендеры продуктов (см. `public/placeholder.svg`).
- Обновить INCI и процентные концентрации в `messages/*`.
- Проверить тексты юридических страниц совместно с юристом.
- Подключить фактический email-сервис или бота для приёма заказов (при необходимости заменить webhook на SMTP/Nodemailer).
- Настроить GA4 / дополнительные аналитические скрипты.
- При запуске форума заменить ссылки на актуальный домен `forum.psoriatinin.{tld}`.

## Тестирование и качество

- Линт: `npm run lint` (Next.js ESLint).
- Рекомендуется проверять страницы Lighthouse (mobile) — вёрстка оптимизирована на 90+ по Perf / Best Practices / SEO, A11y ≥ 90.

## Где искать контент

- Статические данные продуктов/страниц — `messages/*.ts`.
- Компоненты — `components/`.
- Лейаут/провайдеры — `app/[locale]/layout.tsx`.
- Глобальные стили и токены — `app/globals.css`, `tailwind.config.ts`.

