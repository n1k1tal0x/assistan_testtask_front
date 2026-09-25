import { onMounted, ref } from 'vue'
import { ApiError } from '@/shared/api/http'
import { fetchVacationRequests, type RequestStatus, type VacationRequest } from '@/entities/vacation-request'
import { useListAccess } from '@/features/list-access'

const PAGE_SIZE = 10

export function useRequestsList() {
  const { password } = useListAccess()

  const items = ref<VacationRequest[]>([])
  const total = ref(0)
  const page = ref(1)
  const statusFilter = ref<RequestStatus | ''>('')
  const isLoading = ref(false)
  const errorMessage = ref('')

  async function load() {
    isLoading.value = true
    errorMessage.value = ''
    try {
      const result = await fetchVacationRequests({
        password: password.value,
        page: page.value,
        limit: PAGE_SIZE,
        status: statusFilter.value || undefined,
      })
      items.value = result.items
      total.value = result.total
    } catch (error) {
      errorMessage.value =
        error instanceof ApiError ? error.message : 'Не удалось загрузить список заявок'
    } finally {
      isLoading.value = false
    }
  }

  function setStatusFilter(status: RequestStatus | '') {
    statusFilter.value = status
    page.value = 1
    load()
  }

  function goToPage(next: number) {
    page.value = next
    load()
  }

  function handleUpdated(updated: VacationRequest) {
    const index = items.value.findIndex((item) => item.id === updated.id)
    if (index !== -1) items.value[index] = updated
  }

  onMounted(load)

  return {
    items,
    total,
    page,
    pageSize: PAGE_SIZE,
    statusFilter,
    isLoading,
    errorMessage,
    setStatusFilter,
    goToPage,
    handleUpdated,
  }
}
