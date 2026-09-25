import { apiRequest } from '@/shared/api/http'
import type {
  CreateVacationRequestPayload,
  RequestStatus,
  VacationRequest,
  VacationRequestsPage,
} from '../model/types'

export function createVacationRequest(
  payload: CreateVacationRequestPayload,
): Promise<VacationRequest> {
  return apiRequest<VacationRequest>('/requests', { method: 'POST', body: payload })
}

interface FetchVacationRequestsParams {
  password: string
  status?: RequestStatus
  page?: number
  limit?: number
}

export function fetchVacationRequests(
  params: FetchVacationRequestsParams,
): Promise<VacationRequestsPage> {
  const query = new URLSearchParams()
  if (params.status) query.set('status', params.status)
  if (params.page) query.set('page', String(params.page))
  if (params.limit) query.set('limit', String(params.limit))

  return apiRequest<VacationRequestsPage>(`/requests?${query.toString()}`, {
    headers: { 'x-list-password': params.password },
  })
}

export function approveVacationRequest(id: string): Promise<VacationRequest> {
  return apiRequest<VacationRequest>(`/requests/${id}/approve`, { method: 'PATCH' })
}

export function rejectVacationRequest(id: string, reason: string): Promise<VacationRequest> {
  return apiRequest<VacationRequest>(`/requests/${id}/reject`, {
    method: 'PATCH',
    body: { reason },
  })
}
