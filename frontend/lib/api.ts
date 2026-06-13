import type { CreateAlertPayload, PatientAlert, UpdateAlertPayload } from './types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: 'Error desconocido' }))
    const message = body?.message ?? `Error HTTP ${res.status}`
    throw new ApiError(
      res.status,
      Array.isArray(message) ? message.join(', ') : message,
      typeof body?.code === 'string' ? body.code : undefined,
    )
  }
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const alertsApi = {
  getByPatient: async (patientId: string): Promise<PatientAlert[]> => {
    const res = await fetch(`${BASE_URL}/patients/${patientId}/alerts`)
    return handleResponse<PatientAlert[]>(res)
  },

  create: async (patientId: string, payload: CreateAlertPayload): Promise<PatientAlert> => {
    const res = await fetch(`${BASE_URL}/patients/${patientId}/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return handleResponse<PatientAlert>(res)
  },

  update: async (alertId: string, payload: UpdateAlertPayload): Promise<PatientAlert> => {
    const res = await fetch(`${BASE_URL}/patient-alerts/${alertId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return handleResponse<PatientAlert>(res)
  },

  delete: async (alertId: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/patient-alerts/${alertId}`, {
      method: 'DELETE',
    })
    return handleResponse<void>(res)
  },
}
