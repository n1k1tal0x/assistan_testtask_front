<script setup lang="ts">
defineProps<{
  modelValue: string
  label: string
  error?: string
  placeholder?: string
  rows?: number
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label class="field">
    <span class="field__label">{{ label }}</span>
    <textarea
      class="field__control"
      :class="{ 'field__control--invalid': error }"
      :rows="rows ?? 4"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
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
  padding: 12px 14px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.5;
  resize: vertical;
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
