import { AlertSeverity } from './alert-severity.enum';
import { AlertType } from './alert-type.enum';
import { PatientAlertEntity } from './patient-alert.entity';
export interface AlertIdentity {
    type: AlertType;
    severity: AlertSeverity;
    message: string;
}
export declare function normalizeAlertMessage(message: string): string;
export declare function buildAlertIdentity(type: AlertType, severity: AlertSeverity, message: string): AlertIdentity;
export declare function isSameActiveAlertIdentity(alert: PatientAlertEntity, identity: AlertIdentity): boolean;
export declare function findConflictingActiveAlert(alerts: PatientAlertEntity[], identity: AlertIdentity, excludeAlertId?: string): PatientAlertEntity | undefined;
