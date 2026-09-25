<script setup lang="ts">
import BaseButton from '@/shared/ui/BaseButton.vue'
import BaseInput from '@/shared/ui/BaseInput.vue'
import BaseTextarea from '@/shared/ui/BaseTextarea.vue'
import InlineAlert from '@/shared/ui/InlineAlert.vue'
import { useSubmitVacationRequest, todayISODate } from '../model/useSubmitVacationRequest'

const { form, errors, isSubmitting, submitError, isSubmitted, submit } = useSubmitVacationRequest()
const minDate = todayISODate()
</script>

<template>
  <form class="form" novalidate @submit.prevent="submit">
    <BaseInput v-model="form.fullName" label="ФИО" placeholder="Иванов Иван Иванович" :error="errors.fullName" />

    <div class="form__row">
      <BaseInput v-model="form.dateFrom" type="date" label="Дата с" :min="minDate" :error="errors.dateFrom" />
      <BaseInput v-model="form.dateTo" type="date" label="Дата по" :min="minDate" :error="errors.dateTo" />
    </div>

    <BaseTextarea
      v-model="form.reason"
      label="Причина"
      placeholder="Например: ежегодный оплачиваемый отпуск (не менее 20 символов)"
      :error="errors.reason"
    />

    <InlineAlert v-if="submitError" tone="error">{{ submitError }}</InlineAlert>
    <InlineAlert v-if="isSubmitted" tone="success">
      Заявка отправлена. Руководитель рассмотрит её и примет решение.
    </InlineAlert>

    <div class="form__actions">
      <BaseButton type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Отправляем…' : 'Отправить заявку' }}
      </BaseButton>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form__actions {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 560px) {
  .form__row {
    grid-template-columns: 1fr;
  }

  .form__actions {
    justify-content: stretch;
  }

  .form__actions :deep(.btn) {
    width: 100%;
  }
}
</style>
