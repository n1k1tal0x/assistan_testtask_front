export const REQUEST_STATUSES = ['pending', 'approved', 'rejected'] as const

export type RequestStatus = (typeof REQUEST_STATUSES)[number]

export interface VacationRequest {
  id: string
  fullName: string
  dateFrom: string
  dateTo: string
  reason: string
  status: RequestStatus
  rejectionReason: string | null
}

export interface CreateVacationRequestPayload {
  fullName: string
  dateFrom: string
  dateTo: string
  reason: string
}

export interface VacationRequestsPage {
  items: VacationRequest[]
  total: number
  page: number
  limit: number
}
