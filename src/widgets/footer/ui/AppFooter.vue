<script setup lang="ts">
const REPOS = [
  { label: 'Backend', href: 'https://github.com/n1k1tal0x/assistan_testtask_back' },
  { label: 'Frontend', href: 'https://github.com/n1k1tal0x/assistan_testtask_front' },
]
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <span class="footer__label">Исходный код</span>
      <ul class="footer__links">
        <li v-for="repo in REPOS" :key="repo.href">
          <a :href="repo.href" target="_blank" rel="noopener">
            <svg viewBox="0 0 16 16" class="footer__icon" aria-hidden="true">
              <path
                fill="currentColor"
                d="M8 0C3.58 0 0 3.67 0 8.2c0 3.62 2.29 6.7 5.47 7.79.4.08.55-.18.55-.4
                   0-.19-.01-.82-.01-1.49-2.01.38-2.53-.5-2.69-.96-.09-.23-.48-.96-.82-1.15
                   -.28-.15-.68-.53-.01-.54.63-.01 1.08.59 1.23.83.72 1.23 1.87.88 2.33.67
                   .07-.53.28-.88.51-1.08-1.78-.2-3.64-.91-3.64-4.02 0-.89.31-1.62.82-2.19
                   -.08-.2-.36-1.03.08-2.15 0 0 .67-.22 2.2.84a7.4 7.4 0 0 1 4 0c1.53-1.06 2.2-.84 2.2-.84
                   .44 1.12.16 1.95.08 2.15.51.57.82 1.29.82 2.19 0 3.12-1.87 3.81-3.65 4.02.29.26.54.76.54 1.53
                   0 1.11-.01 1.99-.01 2.27 0 .22.15.48.55.4A8.21 8.21 0 0 0 16 8.2C16 3.67 12.42 0 8 0Z"
              />
            </svg>
            <span>{{ repo.label }}</span>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  margin-top: auto;
}

.footer__inner {
  max-width: 760px;
  margin: 0 auto;
  padding: 22px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.footer__label {
  font-size: 13px;
  color: var(--faint);
}

.footer__links {
  display: flex;
  gap: 20px;
}

.footer__links a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  color: var(--ink-soft);
  text-decoration: none;
}

.footer__links a:hover {
  color: var(--teal-ink);
}

.footer__links a:hover span {
  text-decoration: underline;
}

.footer__icon {
  width: 15px;
  height: 15px;
  flex: none;
}
</style>
