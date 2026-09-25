<script setup lang="ts">
import { computed } from 'vue'
import InlineAlert from '@/shared/ui/InlineAlert.vue'
import BaseButton from '@/shared/ui/BaseButton.vue'
import {
  REQUEST_STATUSES,
  StatusBadge,
  calculateDays,
  formatDate,
  type RequestStatus,
} from '@/entities/vacation-request'
import { RequestDecisionActions } from '@/features/decide-vacation-request'
import { useRequestsList } from '../model/useRequestsList'

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

      <div v-else class="table" role="table">
        <div class="table__row table__row--head" role="row">
          <span class="table__cell table__cell--name" role="columnheader">ФИО</span>
          <span class="table__cell table__cell--period" role="columnheader">Период</span>
          <span class="table__cell table__cell--days" role="columnheader">Дней</span>
          <span class="table__cell table__cell--status" role="columnheader">Статус</span>
          <span class="table__cell table__cell--decision" role="columnheader">Решение</span>
        </div>

        <div v-for="item in items" :key="item.id" class="table__row" role="row">
          <span class="table__cell table__cell--name" data-label="ФИО" role="cell">{{ item.fullName }}</span>
          <span class="table__cell table__cell--period" data-label="Период" role="cell">
            {{ formatDate(item.dateFrom) }} – {{ formatDate(item.dateTo) }}
          </span>
          <span class="table__cell table__cell--days" data-label="Дней" role="cell">
            {{ calculateDays(item.dateFrom, item.dateTo) }}
          </span>
          <span class="table__cell table__cell--status" data-label="Статус" role="cell">
            <StatusBadge :status="item.status" />
          </span>
          <span class="table__cell table__cell--decision" data-label="Решение" role="cell">
            <RequestDecisionActions :request="item" @updated="handleUpdated" />
          </span>
        </div>
      </div>

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
  min-width: 0;
}

.requests__toolbar {
  display: flex;
  justify-content: flex-end;
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

.table {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.table__row {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 18px 0;
  border-bottom: 1px solid var(--border);
  min-width: 0;
}

.table__row:last-child {
  border-bottom: none;
}

.table__row--head .table__cell {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--muted);
}

.table__cell {
  min-width: 0;
  font-size: 14.5px;
  line-height: 1.5;
}

.table__cell--name {
  flex: 1 1 160px;
}

.table__cell--period {
  flex: 0 1 150px;
  white-space: nowrap;
}

.table__cell--days {
  flex: 0 0 50px;
}

.table__cell--status {
  flex: 0 0 100px;
}

.table__cell--decision {
  flex: 1 1 220px;
}

.requests__pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 14px;
  color: var(--ink-soft);
}

@media (max-width: 640px) {
  .table__row--head {
    display: none;
  }

  .table__row {
    flex-direction: column;
    gap: 10px;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 16px 18px;
    margin-bottom: 12px;
  }

  .table__cell {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
  }

  .table__cell::before {
    content: attr(data-label);
    font-size: 12.5px;
    font-weight: 600;
    color: var(--muted);
    flex: none;
    padding-top: 2px;
  }
}
</style>
