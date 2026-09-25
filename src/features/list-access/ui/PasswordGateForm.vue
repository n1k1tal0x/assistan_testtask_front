<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/ui/BaseButton.vue'
import BaseInput from '@/shared/ui/BaseInput.vue'
import InlineAlert from '@/shared/ui/InlineAlert.vue'
import { useListAccess } from '../model/useListAccess'

const { unlock } = useListAccess()

const password = ref('')
const isChecking = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  if (!password.value) {
    errorMessage.value = 'Введите пароль'
    return
  }

  isChecking.value = true
  errorMessage.value = ''

  const result = await unlock(password.value)

  if (!result.ok) {
    errorMessage.value = result.message
  }

  isChecking.value = false
}
</script>

<template>
  <form class="gate" novalidate @submit.prevent="handleSubmit">
    <h2 class="gate__title">Список заявок закрыт паролем</h2>
    <p class="gate__hint">Введите пароль, чтобы посмотреть заявки и принять решение по ним.</p>

    <div class="gate__row">
      <BaseInput v-model="password" type="password" label="Пароль" placeholder="••••••••" />
      <BaseButton type="submit" :disabled="isChecking">
        {{ isChecking ? 'Проверяем…' : 'Войти' }}
      </BaseButton>
    </div>

    <InlineAlert v-if="errorMessage" tone="error">{{ errorMessage }}</InlineAlert>
  </form>
</template>

<style scoped>
.gate {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 420px;
  margin: 0 auto;
  text-align: center;
}

.gate__title {
  font-size: 22px;
}

.gate__hint {
  color: var(--muted);
}

.gate__row {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  text-align: left;
}

.gate__row :deep(.field) {
  flex: 1;
}

@media (max-width: 480px) {
  .gate__row {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
