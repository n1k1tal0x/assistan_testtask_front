# Модуль «Заявка на отпуск» — Frontend

Vue 3 + TypeScript (Vite), собран по Feature-Sliced Design.

## Стек

- Vue 3 (`<script setup>`) + TypeScript
- Vite
- vue-router

## Что реализовано

- **Главная** (`/`) — форма подачи заявки (ФИО, дата с/по, причина) с клиентской валидацией,
  зеркалящей бэкенд (обязательные поля, дата «по» не раньше даты «с», причина не пустая).
- **Список заявок** (`/requests`) — закрыт паролем: пока не введён верный `x-list-password`,
  показывается форма входа вместо списка. После входа — таблица заявок со статусом, фильтром
  по статусу и пагинацией; количество дней отпуска считается на фронтенде по `dateFrom`/`dateTo`.
  Для заявок в статусе «Ожидает» — кнопки «Одобрить»/«Отклонить» (отказ требует причину).
- Хедер со ссылками «Главная»/«Список заявок», футер со ссылками на оба репозитория (backend/frontend).

## Структура (FSD)

```
src/
  app/        — точка сборки: роутер, глобальные стили/токены, корневой App.vue
  pages/      — home, requests-list
  widgets/    — header, footer, requests-table
  features/   — submit-vacation-request, list-access, decide-vacation-request
  entities/   — vacation-request (типы, API-запросы, StatusBadge, расчёт дней)
  shared/     — api-клиент, конфиг, базовые UI-компоненты (Button/Input/Textarea/Card/Alert)
```

## Backend

Ходит в backend по REST API, адрес берётся из `VITE_API_BASE_URL` (см. `.env`,
по умолчанию `http://localhost:3000`). Backend должен быть запущен и разрешать CORS
с адреса, на котором работает фронтенд (см. `CORS_ORIGIN` в backend-репозитории).

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # проверка типов + сборка в dist/
```
