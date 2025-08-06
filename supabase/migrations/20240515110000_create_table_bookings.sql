-- Миграция: создание таблицы бронирований
-- Создаётся до триггера notify_telegram_trigger

create extension if not exists "pgcrypto";

create table if not exists public.table_bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  guests integer not null check (guests > 0),
  date date not null,
  time time not null,
  status text not null default 'pending',
  "specialRequests" text,
  created_at timestamp without time zone not null default timezone('utc'::text, now())
);

-- Индекс для быстрого поиска бронирований по дате
create index if not exists idx_table_bookings_date on public.table_bookings(date);