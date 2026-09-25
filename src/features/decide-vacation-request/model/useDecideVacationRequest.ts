import { ref } from 'vue'
import { ApiError } from '@/shared/api/http'
import { approveVacationRequest, rejectVacationRequest, type VacationRequest } from '@/entities/vacation-request'

export function useDecideVacationRequest(onUpdated: (request: VacationRequest) => void) {
  const isApproving = ref(false)
  const isRejecting = ref(false)
  const errorMessage = ref('')

  async function approve(id: string) {
    isApproving.value = true
    errorMessage.value = ''
    try {
      const updated = await approveVacationRequest(id)
      onUpdated(updated)
    } catch (error) {
      errorMessage.value = error instanceof ApiError ? error.message : 'Не удалось одобрить заявку'
    } finally {
      isApproving.value = false
    }
  }

  async function reject(id: string, reason: string) {
    isRejecting.value = true
    errorMessage.value = ''
    try {
      const updated = await rejectVacationRequest(id, reason)
      onUpdated(updated)
      return true
    } catch (error) {
      errorMessage.value = error instanceof ApiError ? error.message : 'Не удалось отклонить заявку'
      return false
    } finally {
      isRejecting.value = false
    }
  }

  return { isApproving, isRejecting, errorMessage, approve, reject }
}
