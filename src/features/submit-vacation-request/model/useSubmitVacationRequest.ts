import { reactive, ref } from 'vue'
import { ApiError } from '@/shared/api/http'
import { createVacationRequest } from '@/entities/vacation-request'

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
    errors.dateTo = form.dateTo ? undefined : 'Укажите дату окончания'

    if (form.dateFrom && form.dateTo && form.dateTo < form.dateFrom) {
      errors.dateTo = 'Дата окончания не может быть раньше даты начала'
    }

    errors.reason = form.reason.trim() ? undefined : 'Укажите причину'

    return !errors.fullName && !errors.dateFrom && !errors.dateTo && !errors.reason
  }

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
