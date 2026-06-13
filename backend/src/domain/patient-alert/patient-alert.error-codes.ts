export enum PatientAlertErrorCode {
  DUPLICATE_ACTIVE_ALERT = 'PATIENT_ALERT_DUPLICATE_ACTIVE',
  PATIENT_NOT_FOUND = 'PATIENT_NOT_FOUND',
  ALERT_NOT_FOUND = 'PATIENT_ALERT_NOT_FOUND',
}

export const PatientAlertErrorMessages: Record<PatientAlertErrorCode, string> =
  {
    [PatientAlertErrorCode.DUPLICATE_ACTIVE_ALERT]:
      'Ya existe una alerta activa idéntica para este paciente',
    [PatientAlertErrorCode.PATIENT_NOT_FOUND]: 'Paciente no encontrado',
    [PatientAlertErrorCode.ALERT_NOT_FOUND]: 'Alerta no encontrada',
  };

export function patientAlertError(code: PatientAlertErrorCode) {
  return {
    code,
    message: PatientAlertErrorMessages[code],
  };
}
