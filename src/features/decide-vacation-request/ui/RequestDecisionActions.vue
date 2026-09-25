<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/ui/BaseButton.vue'
import InlineAlert from '@/shared/ui/InlineAlert.vue'
import type { VacationRequest } from '@/entities/vacation-request'
import { useDecideVacationRequest } from '../model/useDecideVacationRequest'

const props = defineProps<{
  request: VacationRequest
}>()

const emit = defineEmits<{
  updated: [request: VacationRequest]
}>()

const { isApproving, isRejecting, errorMessage, approve, reject } = useDecideVacationRequest((updated) =>
  emit('updated', updated),
)

const isRejectFormOpen = ref(false)
const rejectReason = ref('')

function startReject() {
  isRejectFormOpen.value = true
  rejectReason.value = ''
}

function cancelReject() {
  isRejectFormOpen.value = false
  rejectReason.value = ''
}

async function confirmReject() {
  const ok = await reject(props.request.id, rejectReason.value)
  if (ok) {
    isRejectFormOpen.value = false
  }
}
</script>

<template>
  <div v-if="request.status === 'pending'" class="decision">
    <template v-if="!isRejectFormOpen">
      <div class="decision__buttons">
        <BaseButton variant="primary" :disabled="isApproving" @click="approve(request.id)">
          {{ isApproving ? 'Одобряем…' : 'Одобрить' }}
        </BaseButton>
        <BaseButton variant="danger" @click="startReject">Отклонить</BaseButton>
      </div>
      <InlineAlert v-if="errorMessage" tone="error">{{ errorMessage }}</InlineAlert>
    </template>

    <template v-else>
      <textarea
        v-model="rejectReason"
        class="decision__reason"
        rows="2"
        placeholder="Причина отказа"
      />
      <div class="decision__buttons">
        <BaseButton variant="danger" :disabled="isRejecting || !rejectReason.trim()" @click="confirmReject">
          {{ isRejecting ? 'Отклоняем…' : 'Подтвердить отказ' }}
        </BaseButton>
        <BaseButton variant="ghost" :disabled="isRejecting" @click="cancelReject">Отмена</BaseButton>
      </div>
      <InlineAlert v-if="errorMessage" tone="error">{{ errorMessage }}</InlineAlert>
    </template>
  </div>
  <p v-else-if="request.status === 'rejected' && request.rejectionReason" class="decision__note">
    Причина: {{ request.rejectionReason }}
  </p>
</template>

<style scoped>
.decision {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
}

.decision__buttons {
  display: flex;
  gap: 8px;
}

.decision__reason {
  width: 100%;
  padding: 8px 10px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  font-family: var(--font-body);
  font-size: 13.5px;
  resize: vertical;
}

.decision__reason:focus-visible {
  border-color: var(--teal);
}

.decision__note {
  font-size: 13.5px;
  color: var(--muted);
}
</style>
