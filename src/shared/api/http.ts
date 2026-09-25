import { API_BASE_URL } from '@/shared/config/api'

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH'
  body?: unknown
  headers?: Record<string, string>
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  })

  const isJson = response.headers.get('content-type')?.includes('application/json')
  const data = isJson ? await response.json() : undefined

  if (!response.ok) {
    const message = (data && typeof data === 'object' && 'error' in data && typeof data.error === 'string')
      ? data.error
      : `Request failed with status ${response.status}`
    throw new ApiError(response.status, message)
  }

  return data as T
}
