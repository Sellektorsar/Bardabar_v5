# Архитектура проекта Bardabar Cafe

```mermaid
flowchart TD
    user[Пользователь (браузер)]
    frontend[Frontend (React + Vite)]
    supabase[Supabase (Postgres + Auth + Storage)]
    user --> |HTTP/HTTPS| frontend
    frontend --> |REST / RPC| supabase
```

## Описание компонентов

1. **Frontend** — одностраничное приложение на React/Vite, развёртывается на Cloudflare Pages / Vercel.
2. **Supabase** — бекенд-как-сервис, предоставляющий:
   - Реляционную БД Postgres
   - Auth провайдер (email / OAuth)
   - Object Storage для изображений меню
   - Edge Functions при необходимости логики на сервере

## Потоки данных

1. Пользователь загружает SPA, взаимодействует с интерфейсом (меню, бронирование).
2. SPA обращается к Supabase через REST/RPC для CRUD-операций (записи заказов, чтение меню).
3. При авторизации Supabase возвращает JWT, который хранится в localStorage и автоматически подставляется в дальнейшие запросы.

## Будущие улучшения

- Вынести бизнес-логику на Edge Functions для снижения латентности.
- Ввести кэширование публичных данных (меню) через CDN.
- Настроить CI/CD для автоматического деплоя в Production.
