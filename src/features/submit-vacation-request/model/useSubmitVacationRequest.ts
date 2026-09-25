import { reactive, ref, watch } from 'vue'
import { ApiError } from '@/shared/api/http'
import { createVacationRequest } from '@/entities/vacation-request'

const DATE_ORDER_ERROR = 'Дата окончания не может быть раньше даты начала'
const PAST_DATE_ERROR = 'Дата не может быть раньше сегодняшнего дня'
const MIN_REASON_LENGTH = 20

export function todayISODate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

interface FormState {
  fullName: string
  dateFrom: string
  dateTo: string
  reason: string
}

interface FormErrors {
  fullName?: string
  dateFrom?: string
  dateTo?: string
  reason?: string
}

function createEmptyForm(): FormState {
  return { fullName: '', dateFrom: '', dateTo: '', reason: '' }
}

export function useSubmitVacationRequest() {
  const form = reactive<FormState>(createEmptyForm())
  const errors = reactive<FormErrors>({})
  const isSubmitting = ref(false)
  const submitError = ref('')
  const isSubmitted = ref(false)

  function validate(): boolean {
    errors.fullName = form.fullName.trim() ? undefined : 'Укажите ФИО'

    errors.dateFrom = form.dateFrom ? undefined : 'Укажите дату начала'
    if (form.dateFrom && form.dateFrom < todayISODate()) {
      errors.dateFrom = PAST_DATE_ERROR
    }

    errors.dateTo = form.dateTo ? undefined : 'Укажите дату окончания'
    if (form.dateFrom && form.dateTo && form.dateTo < form.dateFrom) {
      errors.dateTo = DATE_ORDER_ERROR
    }

    const reason = form.reason.trim()
    if (!reason) {
      errors.reason = 'Укажите причину'
    } else if (reason.length < MIN_REASON_LENGTH) {
      errors.reason = `Причина должна быть не короче ${MIN_REASON_LENGTH} символов`
    } else {
      errors.reason = undefined
    }

    return !errors.fullName && !errors.dateFrom && !errors.dateTo && !errors.reason
  }

  // Проверяем даты сразу при вводе, не дожидаясь сабмита.
  watch([() => form.dateFrom, () => form.dateTo], ([dateFrom, dateTo]) => {
    if (dateFrom && dateFrom < todayISODate()) {
      errors.dateFrom = PAST_DATE_ERROR
    } else if (errors.dateFrom === PAST_DATE_ERROR) {
      errors.dateFrom = undefined
    }

    if (dateFrom && dateTo && dateTo < dateFrom) {
      errors.dateTo = DATE_ORDER_ERROR
    } else if (errors.dateTo === DATE_ORDER_ERROR) {
      errors.dateTo = undefined
    }
  })

  async function submit() {
    submitError.value = ''
    isSubmitted.value = false

    if (!validate()) return

    isSubmitting.value = true
    try {
      await createVacationRequest({
        fullName: form.fullName.trim(),
        dateFrom: form.dateFrom,
        dateTo: form.dateTo,
        reason: form.reason.trim(),
      })
      isSubmitted.value = true
      Object.assign(form, createEmptyForm())
    } catch (error) {
      submitError.value =
        error instanceof ApiError ? error.message : 'Не удалось отправить заявку. Попробуйте ещё раз.'
    } finally {
      isSubmitting.value = false
    }
  }

  return { form, errors, isSubmitting, submitError, isSubmitted, submit }
}
