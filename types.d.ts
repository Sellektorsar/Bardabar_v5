/* Автосгенерированные глобальные объявления для подавления ошибок не найденных модулей с суффиксом версии и глобального объекта Deno */

// Разрешаем импорты вида "lucide-react@0.487.0", "@radix-ui/react-tooltip@1.1.8" и пр.
declare module '*@@*' {
  const value: any;
  export = value;
}

// Объявление модуля для шаблона вида package@version без слеша
declare module '*@*' {
  const value: any;
  export = value;
}

// Глобальный объект Deno, используемый в функциях Supabase
declare module '@*/*@*' {
  const value: any;
  export = value;
}

// Глобальный объект Deno, используемый в функциях Supabase
declare module '@radix-ui/*' {
  const value: any;
  export = value;
}

declare module '@radix-ui/react-slot@*' {
  export * from '@radix-ui/react-slot';
}

declare module '@sentry/*' {
  const value: any;
  export = value;
}

declare module 'class-variance-authority@*' {
  export * from 'class-variance-authority';
  export { default } from 'class-variance-authority';
}

declare module 'react-resizable-panels@*' {
  export * from 'react-resizable-panels';
  export { default } from 'react-resizable-panels';
}

declare module 'lucide-react@*' {
  export * from 'lucide-react';
}

declare module 'sonner@*' {
  export * from 'sonner';
  export { default } from 'sonner';
}

// Объявление модуля для dotenv-expand, чтобы подавить ошибку отсутствующих типов
declare module 'dotenv-expand' {
  const value: any;
  export = value;
}

declare const Deno: any;

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_SENTRY_ENVIRONMENT?: string;
  readonly VITE_SENTRY_RELEASE?: string;
  readonly VITE_SUPABASE_EDGE_URL: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Декларации для модулей Edge Runtime, импортируемых через "npm:" в Supabase Functions

declare module 'npm:hono' {
  export * from 'hono';
  export { default } from 'hono';
}

declare module 'npm:hono/cors' {
  const cors: any;
  export = cors;
}

declare module 'npm:hono/logger' {
  const logger: any;
  export = logger;
}

// Поддержка импорта модулей через префикс "jsr:" (например, jsr:@supabase/supabase-js@*)
declare module 'jsr:@supabase/supabase-js@2.49.8' {
  export * from '@supabase/supabase-js';
}
