<script setup lang="ts">
defineProps<{
  modelValue: string
  label: string
  type?: string
  error?: string
  placeholder?: string
  min?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label class="field">
    <span class="field__label">{{ label }}</span>
    <input
      class="field__control"
      :class="{ 'field__control--invalid': error }"
      :type="type ?? 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      :min="min"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="error" class="field__error">{{ error }}</span>
  </label>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field__label {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--ink-soft);
}

.field__control {
  height: 42px;
  padding: 0 14px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 15px;
  transition: border-color 0.15s ease;
}

.field__control::placeholder {
  color: var(--faint);
}

.field__control:focus-visible {
  border-color: var(--teal);
}

.field__control--invalid {
  border-color: var(--rose);
}

.field__error {
  font-size: 13px;
  color: var(--rose);
}
</style>
