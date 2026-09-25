<script setup lang="ts">
import { computed } from 'vue'
import InlineAlert from '@/shared/ui/InlineAlert.vue'
import BaseButton from '@/shared/ui/BaseButton.vue'
import { REQUEST_STATUSES, type RequestStatus } from '@/entities/vacation-request'
import { useRequestsList } from '../model/useRequestsList'
import RequestCard from './RequestCard.vue'

const { items, total, page, pageSize, statusFilter, isLoading, errorMessage, setStatusFilter, goToPage, handleUpdated } =
  useRequestsList()

const STATUS_LABELS: Record<RequestStatus, string> = {
  pending: 'Ожидает',
  approved: 'Одобрена',
  rejected: 'Отклонена',
}

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))

function handleFilterChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value as RequestStatus | ''
  setStatusFilter(value)
}
</script>

<template>
  <div class="requests">
    <div class="requests__toolbar">
      <h1 class="requests__title">Список заявок</h1>
      <label class="requests__filter">
        <span>Статус</span>
        <select :value="statusFilter" @change="handleFilterChange">
          <option value="">Все</option>
          <option v-for="status in REQUEST_STATUSES" :key="status" :value="status">
            {{ STATUS_LABELS[status] }}
          </option>
        </select>
      </label>
    </div>

    <InlineAlert v-if="errorMessage" tone="error">{{ errorMessage }}</InlineAlert>

    <p v-if="isLoading" class="requests__state">Загружаем…</p>

    <template v-else>
      <p v-if="items.length === 0" class="requests__state">По этому фильтру заявок нет.</p>

      <ul v-else class="requests__list">
        <RequestCard v-for="item in items" :key="item.id" :request="item" @updated="handleUpdated" />
      </ul>

      <div v-if="totalPages > 1" class="requests__pagination">
        <BaseButton variant="ghost" :disabled="page <= 1" @click="goToPage(page - 1)">Назад</BaseButton>
        <span>Стр. {{ page }} из {{ totalPages }}</span>
        <BaseButton variant="ghost" :disabled="page >= totalPages" @click="goToPage(page + 1)">Далее</BaseButton>
      </div>
    </template>
  </div>
</template>

<style scoped>
.requests {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.requests__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.requests__title {
  font-size: 20px;
  font-weight: 600;
  color: var(--ink);
}

.requests__filter {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  color: var(--ink-soft);
}

.requests__filter select {
  height: 38px;
  padding: 0 10px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 14px;
}

.requests__state {
  color: var(--muted);
  padding: 24px 0;
  text-align: center;
}

.requests__list {
  display: flex;
  flex-direction: column;
}

.requests__pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 14px;
  color: var(--ink-soft);
}
</style>
