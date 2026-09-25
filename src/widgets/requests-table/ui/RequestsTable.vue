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

      <table v-else class="table">
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Период</th>
            <th>Дней</th>
            <th>Статус</th>
            <th>Решение</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td data-label="ФИО">{{ item.fullName }}</td>
            <td data-label="Период">{{ formatDate(item.dateFrom) }} – {{ formatDate(item.dateTo) }}</td>
            <td data-label="Дней">{{ calculateDays(item.dateFrom, item.dateTo) }}</td>
            <td data-label="Статус"><StatusBadge :status="item.status" /></td>
            <td data-label="Решение">
              <RequestDecisionActions :request="item" @updated="handleUpdated" />
            </td>
          </tr>
        </tbody>
      </table>

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
  width: 100%;
  border-collapse: collapse;
}

.table th {
  text-align: left;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--muted);
  padding: 0 0 10px;
  border-bottom: 1px solid var(--border);
}

.table td {
  padding: 14px 10px 14px 0;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
  font-size: 14.5px;
}

.table tbody tr:last-child td {
  border-bottom: none;
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
  .table thead {
    display: none;
  }

  .table,
  .table tbody,
  .table tr,
  .table td {
    display: block;
    width: 100%;
  }

  .table tr {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 14px 16px;
    margin-bottom: 12px;
  }

  .table td {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 0;
    border-bottom: none;
  }

  .table td::before {
    content: attr(data-label);
    font-size: 12.5px;
    font-weight: 600;
    color: var(--muted);
    flex: none;
    padding-top: 2px;
  }
}
</style>
