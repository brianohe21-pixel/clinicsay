export type AlertType = 'ALLERGY' | 'MEDICAL_RISK' | 'SPECIAL_CONDITION' | 'ADMINISTRATIVE'
export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH'

export interface PatientAlert {
  id: string
  patientId: string
  type: AlertType
  severity: AlertSeverity
  message: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateAlertPayload {
  type: AlertType
  severity: AlertSeverity
  message: string
  isActive: boolean
}

export interface UpdateAlertPayload {
  type?: AlertType
  severity?: AlertSeverity
  message?: string
  isActive?: boolean
}

export const ALERT_TYPE_LABELS: Record<AlertType, string> = {
  ALLERGY: 'Alergia',
  MEDICAL_RISK: 'Riesgo médico',
  SPECIAL_CONDITION: 'Condición especial',
  ADMINISTRATIVE: 'Administrativa',
}

export const ALERT_TYPE_SHORT: Record<AlertType, string> = {
  ALLERGY: 'Alergia',
  MEDICAL_RISK: 'Riesgo',
  SPECIAL_CONDITION: 'Especial',
  ADMINISTRATIVE: 'Admin',
}

export const ALERT_SEVERITY_LABELS: Record<AlertSeverity, string> = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
}
