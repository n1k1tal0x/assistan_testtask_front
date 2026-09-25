<script setup lang="ts">
import {
  StatusBadge,
  calculateDays,
  formatDate,
  pluralizeDays,
  type VacationRequest,
} from '@/entities/vacation-request'
import { RequestDecisionActions } from '@/features/decide-vacation-request'

defineProps<{
  request: VacationRequest
}>()

const emit = defineEmits<{
  updated: [request: VacationRequest]
}>()
</script>

<template>
  <li class="card">
    <div class="card__top">
      <span class="card__name">{{ request.fullName }}</span>
      <StatusBadge :status="request.status" />
    </div>

    <p class="card__meta">
      {{ formatDate(request.dateFrom) }} – {{ formatDate(request.dateTo) }}
      · {{ pluralizeDays(calculateDays(request.dateFrom, request.dateTo)) }}
    </p>

    <p class="card__reason">{{ request.reason }}</p>

    <div class="card__actions">
      <RequestDecisionActions :request="request" @updated="emit('updated', $event)" />
    </div>
  </li>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px 0;
  border-bottom: 1px solid var(--border);
}

.card:last-child {
  border-bottom: none;
}

.card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card__name {
  font-weight: 600;
  font-size: 15px;
  color: var(--ink);
}

.card__meta {
  font-size: 13.5px;
  color: var(--muted);
}

.card__reason {
  font-size: 14.5px;
  color: var(--ink-soft);
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.card__actions {
  display: flex;
}
</style>
