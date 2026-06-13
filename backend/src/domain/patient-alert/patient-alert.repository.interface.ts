import { AlertSeverity } from './alert-severity.enum';
import { AlertType } from './alert-type.enum';
import { PatientAlertEntity } from './patient-alert.entity';

export const PATIENT_ALERT_REPOSITORY = Symbol('PATIENT_ALERT_REPOSITORY');

export interface IPatientAlertRepository {
  findByPatientId(patientId: string): Promise<PatientAlertEntity[]>;
  findById(id: string): Promise<PatientAlertEntity | null>;
  findActiveByUniqueKey(
    patientId: string,
    type: AlertType,
    severity: AlertSeverity,
    message: string,
  ): Promise<PatientAlertEntity | null>;
  save(alert: PatientAlertEntity): Promise<PatientAlertEntity>;
  update(alert: PatientAlertEntity): Promise<PatientAlertEntity>;
  delete(id: string): Promise<void>;
}
