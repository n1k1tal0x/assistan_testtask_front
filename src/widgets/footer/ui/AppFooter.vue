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
          <a :href="repo.href" target="_blank" rel="noopener">{{ repo.label }}</a>
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
  font-size: 13.5px;
  color: var(--ink-soft);
  text-decoration: none;
}

.footer__links a:hover {
  color: var(--teal-ink);
  text-decoration: underline;
}
</style>
