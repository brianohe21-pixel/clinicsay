import { AlertSeverity } from './alert-severity.enum';
import { AlertType } from './alert-type.enum';
import { PatientAlertEntity } from './patient-alert.entity';

export interface AlertIdentity {
  type: AlertType;
  severity: AlertSeverity;
  message: string;
}

export function normalizeAlertMessage(message: string): string {
  return message.trim();
}

export function buildAlertIdentity(
  type: AlertType,
  severity: AlertSeverity,
  message: string,
): AlertIdentity {
  return {
    type,
    severity,
    message: normalizeAlertMessage(message),
  };
}

export function isSameActiveAlertIdentity(
  alert: PatientAlertEntity,
  identity: AlertIdentity,
): boolean {
  return (
    alert.isActive &&
    alert.isSameActiveAlert(identity.type, identity.severity, identity.message)
  );
}

export function findConflictingActiveAlert(
  alerts: PatientAlertEntity[],
  identity: AlertIdentity,
  excludeAlertId?: string,
): PatientAlertEntity | undefined {
  return alerts.find(
    (alert) =>
      alert.id !== excludeAlertId && isSameActiveAlertIdentity(alert, identity),
  );
}
