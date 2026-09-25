<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__mark">
        <svg viewBox="0 0 46 46" class="header__logo" aria-hidden="true">
          <polygon points="23,2 42,13 42,33 23,44 4,33 4,13" fill="#0E2B4D" />
          <g stroke="#01B8AF" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <rect x="13" y="13" width="20" height="20" rx="3" />
            <path d="M13 20h20M20 13v20" />
          </g>
        </svg>
        <span class="header__title">Отпуска</span>
      </div>

      <nav class="header__nav">
        <RouterLink to="/" class="header__link">Главная</RouterLink>
        <RouterLink to="/requests" class="header__link">Список заявок</RouterLink>
        <RouterLink to="/about" class="header__link">О нас</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}

.header__inner {
  max-width: 760px;
  margin: 0 auto;
  padding: 18px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.header__mark {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header__logo {
  width: 26px;
  height: 26px;
  flex: none;
}

.header__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
  color: var(--ink);
}

.header__nav {
  display: flex;
  gap: 22px;
}

.header__link {
  font-size: 14.5px;
  font-weight: 500;
  color: var(--ink-soft);
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  transition:
    color 0.15s ease,
    border-color 0.15s ease;
}

.header__link:hover {
  color: var(--ink);
}

.header__link.router-link-exact-active {
  color: var(--ink);
  border-color: var(--teal);
}

@media (max-width: 560px) {
  .header__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 20px;
  }

  .header__nav {
    gap: 18px;
  }
}
</style>
