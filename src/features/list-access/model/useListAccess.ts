import { computed, reactive } from 'vue'
import { ApiError } from '@/shared/api/http'
import { fetchVacationRequests } from '@/entities/vacation-request'

const STORAGE_KEY = 'vacationApp:listPassword'

const state = reactive({
  password: sessionStorage.getItem(STORAGE_KEY) ?? '',
})

const isUnlocked = computed(() => state.password.length > 0)

async function unlock(password: string): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    await fetchVacationRequests({ password, page: 1, limit: 1 })
    state.password = password
    sessionStorage.setItem(STORAGE_KEY, password)
    return { ok: true }
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return { ok: false, message: 'Неверный пароль' }
    }
    return { ok: false, message: 'Не удалось проверить пароль. Попробуйте ещё раз.' }
  }
}

function lock() {
  state.password = ''
  sessionStorage.removeItem(STORAGE_KEY)
}

export function useListAccess() {
  return { isUnlocked, password: computed(() => state.password), unlock, lock }
}
