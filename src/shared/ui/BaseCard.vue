<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 30px;
}

@media (max-width: 600px) {
  .card {
    padding: 20px;
  }
}
</style>
