# Итерация 1 — Краткосрочные задачи (0-2 недели)

> Цель: быстро повысить надёжность кода и автоматизировать базовые процессы CI/CD

## 1. Обзор задач

| №   | Задача                                                                                     | Выгода                                              | Ответственный | Приоритет |
| --- | ------------------------------------------------------------------------------------------ | --------------------------------------------------- | ------------- | --------- |
| 1   | ~~Настройка **ESLint/Prettier** + **husky** + **lint-staged**~~ ✅                         | Единый код-стайл, предотвращение ошибок до коммита  | Frontend Lead | 🔥        |
| 2   | ~~Добавление **Unit-тестов** (Jest + React Testing Library) для критичных компонентов~~ ✅ | Минимизирует регрессии                              | QA Engineer   | 🔥        |
| 3   | ~~Настройка **GitHub Actions** (lint → test → build)~~ ✅                                  | Автоматические проверки PR                          | DevOps        | 🔥        |
| 4   | ~~Создание **docs/ARCHITECTURE.md** + диаграмма компонентов~~ ✅                           | Ускоряет онбординг                                  | Tech Writer   | 🟡        |
| 5   | ~~Реализовать **форму бронирования столов** на фронтенде~~ ✅                              | Позволяет пользователям бронировать без регистрации | Frontend      | 🔥        |

> 🔥 — высоко приоритетно, нужно сделать в первую очередь

## 2. Детальный план выполнения

### 2.1 ESLint/Prettier + husky

1. Установить зависимости:
   ```bash
   pnpm add -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import eslint-plugin-jsx-a11y @typescript-eslint/parser @typescript-eslint/eslint-plugin husky lint-staged
   ```
2. Сконфигурировать `.eslintrc.cjs` и `.prettierrc` (ориентироваться на Airbnb + Tailwind plugin).
3. Добавить скрипты в `package.json`:
   ```json
   "scripts": {
     "lint": "eslint \"**/*.{ts,tsx}\" --max-warnings=0",
     "format": "prettier --write \"**/*.{ts,tsx,md}\""
   }
   ```
4. Настроить **husky** (`pre-commit`) → `lint-staged`:
   ```json
   {
     "*.{ts,tsx}": ["eslint --fix"],
     "*.{ts,tsx,md}": ["prettier --write"]
   }
   ```
5. Проверка: локальный коммит должен проходить без ошибок.

### 2.2 Unit-тесты

1. Установить Jest + RTL:
   ```bash
   pnpm add -D jest @testing-library/react @testing-library/jest-dom ts-jest @types/jest
   ```
2. Создать `jest.config.ts` с использованием `ts-jest`.
3. Добавить первую пачку тестов для **Hero**, **Header** и утилит в `components/ui/utils.ts`.
4. Минимальный coverage ≥ 20 % для первого PR.

### 2.3 GitHub Actions

1. Создать workflow `.github/workflows/ci.yml`:
   1. Checkout ➡️ Install deps (pnpm) ➡️ `pnpm lint` ➡️ `pnpm test -- --coverage` ➡️ `pnpm build`.
   2. Кэшировать `~/.pnpm-store`.
2. Настроить статус-чеки для PR в настройках репо (branch protection rules).

### 2.4 Документация архитектуры

1. Создать `docs/ARCHITECTURE.md`.
2. Добавить диаграмму Mermaid, описывающую связь Frontend ↔ Supabase.
3. Ссылку на документ разместить в README.

### 2.5 Форма бронирования столов

1. Создать компонент **TableBookingForm** на базе существующих UI-компонентов.
2. Поля: имя, телефон, дата, время, количество гостей, пожелания.
3. Валидация на фронтенде (react-hook-form + zod).
4. При отправке — POST в Supabase edge function `book_table`.
5. Показ тоста «Бронирование отправлено».

## 3. График

| Неделя | Пн       | Вт                | Ср         | Чт         | Пт               |
| ------ | -------- | ----------------- | ---------- | ---------- | ---------------- |
| 1      | ESLint   | ESLint <br> husky | Unit tests | Unit tests | Docs             |
| 2      | CI setup | CI setup          | Fix issues | Buffer     | Review / release |

## 4. Критерии приёмки

- Lint скрипт завершается без ошибок.
- `pnpm test` показывает coverage ≥ 20 %.
- Все проверки CI проходят автоматически для PR.
- Документ ARCHITECTURE.md одобрен командой.

## 5. Риски и меры

| Риск                                     | Вероятность | Митигирование                                                   |
| ---------------------------------------- | ----------- | --------------------------------------------------------------- |
| Несовместимость настроек ESLint/Prettier | Средняя     | Создать `eslint-config` на базе community preset, обсудить в PR |
| Недостаток времени на тесты              | Высокая     | Сфокусироваться на критичных компонентах, остальное — позже     |

---

✅ **Выходные артефакты:**

- Конфиги ESLint/Prettier, husky hooks
- Первые unit-тесты + отчёт coverage
- Workflow ci.yml
- docs/ARCHITECTURE.md
