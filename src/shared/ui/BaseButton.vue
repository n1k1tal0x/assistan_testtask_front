<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'ghost' | 'danger'
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
  },
)
</script>

<template>
  <button :type="type" class="btn" :class="`btn--${variant}`" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 42px;
  padding: 0 20px;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  font-family: var(--font-body);
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    opacity 0.15s ease;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.btn--primary {
  background: var(--ink);
  color: #ffffff;
}

.btn--primary:hover:not(:disabled) {
  background: var(--teal-ink);
}

.btn--ghost {
  background: transparent;
  color: var(--ink-soft);
  border-color: var(--border);
}

.btn--ghost:hover:not(:disabled) {
  border-color: var(--faint);
  color: var(--ink);
}

.btn--danger {
  background: transparent;
  color: var(--rose);
  border-color: var(--rose-tint);
}

.btn--danger:hover:not(:disabled) {
  background: var(--rose-tint);
}
</style>
