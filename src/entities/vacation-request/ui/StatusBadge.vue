<script setup lang="ts">
import type { RequestStatus } from '../model/types'

const { status } = defineProps<{
  status: RequestStatus
}>()

const LABELS: Record<RequestStatus, string> = {
  pending: 'Ожидает',
  approved: 'Одобрена',
  rejected: 'Отклонена',
}
</script>

<template>
  <span class="badge" :class="`badge--${status}`">{{ LABELS[status] }}</span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.badge--pending {
  background: var(--amber-tint);
  color: var(--amber);
}

.badge--approved {
  background: var(--teal-tint);
  color: var(--teal-ink);
}

.badge--rejected {
  background: var(--rose-tint);
  color: var(--rose);
}
</style>
