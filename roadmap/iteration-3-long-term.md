# Итерация 3 — Долгосрочные задачи (6+ недель)

> Цель: трансформировать архитектуру, улучшить SEO/UX и подготовить проект к масштабированию команды и трафика.

## 1. Обзор задач

| №   | Задача                                                      | Выгода                                      | Ответственный | Приоритет |
| --- | ----------------------------------------------------------- | ------------------------------------------- | ------------- | --------- |
| 1   | Миграция на **Next.js** (App Router, SSR/ISR) или **Remix** | Улучшение SEO, TTFB, DX                     | Frontend Lead | 🔥        |
| 2   | Разделение фронтенда на модули (**NX** или micro-frontends) | Параллельная разработка, независимые деплои | Architect     | 🔥        |
| 3   | Настройка **CDN** (Cloudflare) для статики/изображений      | Снижение latency, offload origin            | DevOps        | 🔥        |
| 4   | Внедрение **GraphQL Gateway** или **tRPC**                  | Типизированный API, единая точка данных     | Backend       | 🟡        |
| 5   | Реализация **PWA** (офлайн-кэш, push-уведомления)           | Улучшение UX, повторные визиты              | Frontend      | 🟡        |
| 6   | Добавление **i18n** (react-i18next) и WCAG-метрик           | Расширение аудитории, доступность           | Frontend      | 🟢        |

> 🔥 — выполнить в первую очередь.

## 2. Детальный план выполнения

### 2.1 Миграция на Next.js

1. Создать новую ветку `migration/nextjs`.
2. Инициализировать Next.js 14 (App Router) с TypeScript и Tailwind.
3. Перенести страницы como **Hero, Menu, Events** в каталоги `/app`.
4. Настроить SSR/ISR для главной и SEO-критичных страниц (OG-теги).
5. Переобновить Vite-специфичные плагины или заменить на аналоги Next.
6. Обновить CI: `pnpm build` → `next build` + `next export` (если SSG).

### 2.2 Модульный фронтенд (NX или Micro-frontends)

1. Если **NX**:
   - Конвертировать репозиторий в Monorepo (`npx nx init`).
   - Создать приложения `web-client`, `admin-panel`, `shared-ui`.
2. Если **Module Federation (webpack)**:
   - Определить host/remote, вынести `ui` в общий пакет.
3. Обновить пути импорта, добавить библиотеки для remote-routing.

### 2.3 CDN для статики

1. Подключить Cloudflare Pages/Workers.
2. Настроить кэш-политику: HTML (max-age 0, stale-while-revalidate), assets (30 дней).
3. Изображения доставлять через Cloudflare Images (AVIF/WebP).

### 2.4 GraphQL Gateway / tRPC

1. Оценить Supabase GraphQL или self-host Hasura.
2. Создать schema, настроить codegen (`graphql-codegen`) → типы TS.
3. Модифицировать data-fetchers в Next.js (React Query + generated hooks).

### 2.5 PWA

1. Использовать `next-pwa` или `workbox` для сервис-воркера.
2. Добавить `manifest.json` (icons, themeColor).
3. Настроить push-уведомления (FCM/Web Push).

### 2.6 i18n + A11Y

1. Установить `react-i18next` + `next-i18next`.
2. Добавить языковые файлы `locales/en`, `locales/ru`.
3. Пройти Lighthouse A11Y audit ≥ 90.

## 3. График (пример 8 недель)

| Неделя | Пн           | Вт            | Ср             | Чт         | Пт         |
| ------ | ------------ | ------------- | -------------- | ---------- | ---------- |
| 7      | Next.js Init | Next.js Pages | Next.js SSR    | SSR        | Review     |
| 8      | NX setup     | MF/NX libs    | Routing        | Tests      | Docs       |
| 9      | CDN config   | CDN rollout   | GraphQL schema | Codegen    | Hooks      |
| 10     | PWA SW       | PWA manifest  | Push           | i18n setup | A11Y fixes |
| 11-12  | Полировка    | Regression    | Perf tests     | Buffer     | 🏁 Release |

## 4. Критерии приёмки

- Главная страница SSR с TTFB ≤ 100 мс (Lighthouse).
- SEO score ≥ 90 (Google Lighthouse).
- Статика обслуживается через Cloudflare, кэш-headers корректны.
- GraphQL endpoint даёт типизированные ответы, покрыты tests.
- PWA проходит audit Lighthouse (PWA-checks ≥ 90).
- Поддержка минимум 2 языков, метрики A11Y ≥ 90.

## 5. Риски и меры

| Риск                               | Вероятность | Митигирование                         |
| ---------------------------------- | ----------- | ------------------------------------- |
| Сложность миграции на Next         | Высокая     | Инкрементальный подход, feature-flags |
| Рост time-to-market из-за Monorepo | Средняя     | NX с кешированием + docs              |
| CDN и SSR конфликт кэша            | Низкая      | Cache-control + revalidate токен      |

---

✅ **Выходные артефакты:**

- Репозиторий с Next.js/NX, рабочий SSR/ISR
- CDN конфиги (Cloudflare)
- GraphQL Gateway + типы TS
- Сервис-воркер, manifest.json
- i18n и A11Y отчёты
