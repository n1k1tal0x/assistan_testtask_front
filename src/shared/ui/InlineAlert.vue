<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'success' | 'error'
  }>(),
  { tone: 'error' },
)
</script>

<template>
  <p class="alert" :class="`alert--${tone}`">
    <slot />
  </p>
</template>

<style scoped>
.alert {
  border-radius: var(--radius-md);
  padding: 10px 14px;
  font-size: 14px;
}

.alert--error {
  background: var(--rose-tint);
  color: var(--rose);
}

.alert--success {
  background: var(--teal-tint);
  color: var(--teal-ink);
}
</style>
