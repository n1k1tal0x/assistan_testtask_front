<script setup lang="ts">
import BaseCard from '@/shared/ui/BaseCard.vue'
import { VacationRequestForm } from '@/features/submit-vacation-request'
</script>

<template>
  <section class="page">
    <h1 class="page__title">Оформите заявку на отпуск</h1>
    <p class="page__lede">
      Укажите ФИО, период отпуска и причину — заявка уйдёт руководителю на рассмотрение.
    </p>

    <BaseCard>
      <VacationRequestForm />
    </BaseCard>
  </section>
</template>

<style scoped>
.page {
  max-width: 640px;
  margin: 0 auto;
  padding: 48px 28px 64px;
}

.page__title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
}

.page__lede {
  color: var(--ink-soft);
  margin-bottom: 32px;
}

@media (max-width: 560px) {
  .page {
    padding: 32px 20px 48px;
  }

  .page__title {
    font-size: 23px;
  }
}
</style>
