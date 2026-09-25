<script setup lang="ts">
import BaseCard from '@/shared/ui/BaseCard.vue'

const FSD_LAYERS = [
  { name: 'app', desc: 'сборка приложения: роутер, глобальные стили и токены, корневой компонент' },
  { name: 'pages', desc: 'главная, список заявок, эта страница' },
  { name: 'widgets', desc: 'header, footer, таблица заявок' },
  { name: 'features', desc: 'подача заявки, доступ к списку по паролю, решение по заявке' },
  { name: 'entities', desc: 'заявка на отпуск: типы, запросы к API, статус-бейдж' },
  { name: 'shared', desc: 'HTTP-клиент, конфиг, базовые компоненты интерфейса' },
]

const WATCH_SNIPPET = `watch([() => form.dateFrom, () => form.dateTo], ([dateFrom, dateTo]) => {
  if (dateFrom && dateTo && dateTo < dateFrom) {
    errors.dateTo = DATE_ORDER_ERROR
  } else if (errors.dateTo === DATE_ORDER_ERROR) {
    errors.dateTo = undefined
  }
})`
</script>

<template>
  <section class="page">
    <h1 class="page__title">О проекте</h1>
    <p class="page__lede">
      «Заявка на отпуск» — модуль, в котором сотрудник подаёт заявку, а руководитель
      её одобряет или отклоняет. Ниже — коротко обо всём: что сделано, как разложен код
      фронтенда и почему форма реагирует на ввод мгновенно.
    </p>

    <BaseCard>
      <h2 class="section__title">Коротко о проекте</h2>
      <ul class="list">
        <li>Форма заявки (ФИО, период, причина) с валидацией и на сервере, и в интерфейсе.</li>
        <li>Список заявок со статусом, фильтром и пагинацией — открывается по паролю.</li>
        <li>Решение по заявке: «Одобрить» / «Отклонить» с обязательной причиной отказа.</li>
        <li>
          Docker Compose поднимает всё разом: backend, Postgres (не смотрит во внешнюю сеть —
          доступна только backend'у) и frontend (клонируется и запускается тем же compose-файлом,
          настройки — из общего <code>.env</code>).
        </li>
      </ul>
    </BaseCard>

    <div class="role-grid">
      <BaseCard>
        <h2 class="role__title">Backend</h2>
        <p class="role__text">
          Node.js, TypeScript, Fastify. REST API (<code>POST/GET /requests</code>,
          <code>PATCH .../approve</code>, <code>.../reject</code>) поверх хранилища заявок
          в памяти процесса. Схема для PostgreSQL описана code-first через Drizzle ORM —
          миграции генерируются из TypeScript, а не пишутся вручную. Просмотр списка закрыт
          паролем из переменной окружения.
        </p>
      </BaseCard>

      <BaseCard>
        <h2 class="role__title">Frontend</h2>
        <p class="role__text">
          Vue 3 (<code>&lt;script setup&gt;</code>) и TypeScript на Vite, собран по
          Feature-Sliced Design. Три страницы — главная, список заявок, эта страница —
          и общий header/footer со ссылками на оба репозитория.
        </p>
      </BaseCard>
    </div>

    <BaseCard>
      <h2 class="section__title">Архитектура фронтенда: FSD</h2>
      <p class="section__text">
        Код разложен по слоям — от инфраструктуры приложения до переиспользуемых
        примитивов интерфейса, каждый слой знает только о том, что ниже него.
      </p>

      <dl class="layers">
        <div v-for="layer in FSD_LAYERS" :key="layer.name" class="layers__row">
          <dt class="layers__name">{{ layer.name }}</dt>
          <dd class="layers__desc">{{ layer.desc }}</dd>
        </div>
      </dl>

      <p class="section__text">
        Например, форма на главной — это <code>features/submit-vacation-request</code>: она
        берёт структуру заявки и запрос на создание из <code>entities/vacation-request</code>,
        а поля и кнопку — из <code>shared/ui</code>. Страница <code>pages/home</code> просто
        кладёт эту форму в карточку, ничего не зная о её внутренностях. Список заявок собран
        так же: <code>widgets/requests-table</code> объединяет статус и расчёт дней из
        <code>entities/vacation-request</code> с кнопками решения из
        <code>features/decide-vacation-request</code>, а <code>pages/requests-list</code>
        решает только одно — показывать форму пароля (<code>features/list-access</code>)
        или уже готовую таблицу.
      </p>
    </BaseCard>

    <BaseCard>
      <h2 class="section__title">Реактивность Vue на примере валидации дат</h2>
      <p class="section__text">
        Поле «Дата по» проверяется не при отправке формы, а сразу при вводе — это пример
        реактивности Vue. Поля формы лежат в <code>reactive</code>-объекте, а
        <code>watch</code> следит за парой <code>dateFrom</code>/<code>dateTo</code>:
      </p>

      <pre class="code"><code>{{ WATCH_SNIPPET }}</code></pre>

      <p class="section__text">
        Как только меняется любая из дат, коллбэк пересчитывает условие и обновляет
        <code>errors.dateTo</code>. Поле ввода уже подписано на это значение через
        <code>:error="errors.dateTo"</code> — и сообщение об ошибке появляется и исчезает
        само, без единой строчки, которая бы вручную трогала DOM. Тот же принцип работает
        и в списке заявок: когда <code>features/decide-vacation-request</code> получает
        ответ от API, он просто заменяет заявку в реактивном массиве — и строка таблицы
        перерисовывается сама.
      </p>
    </BaseCard>
  </section>
</template>

<style scoped>
.page {
  max-width: 760px;
  margin: 0 auto;
  padding: 48px 28px 64px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page__title {
  font-size: 28px;
  font-weight: 600;
}

.page__lede {
  color: var(--ink-soft);
  margin-top: -12px;
}

.section__title {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 14px;
}

.section__text {
  color: var(--ink-soft);
  font-size: 14.5px;
  margin-top: 14px;
}

.section__text code,
.list code,
.role__text code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--bg);
  padding: 1px 5px;
  border-radius: 4px;
}

.list {
  list-style: disc;
  padding-left: 20px;
  color: var(--ink-soft);
  font-size: 14.5px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.role-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.role__title {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 10px;
}

.role__text {
  color: var(--ink-soft);
  font-size: 14.5px;
}

.layers {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.layers__row {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px;
  align-items: baseline;
}

.layers__name {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--teal-ink);
}

.layers__desc {
  margin: 0;
  color: var(--ink-soft);
  font-size: 14.5px;
}

.code {
  margin: 14px 0;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: var(--ink);
  color: #e7ecf3;
  font-family: var(--font-mono);
  font-size: 12.5px;
  line-height: 1.6;
  overflow-x: auto;
}

@media (max-width: 560px) {
  .page {
    padding: 32px 20px 48px;
  }

  .role-grid {
    grid-template-columns: 1fr;
  }

  .layers__row {
    grid-template-columns: 1fr;
    gap: 2px;
  }
}
</style>
