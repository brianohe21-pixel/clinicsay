import { AlertSeverity } from '../../domain/patient-alert/alert-severity.enum';
import { AlertType } from '../../domain/patient-alert/alert-type.enum';
import { PatientAlertEntity } from '../../domain/patient-alert/patient-alert.entity';
import type { IPatientAlertRepository } from '../../domain/patient-alert/patient-alert.repository.interface';
export interface UpdatePatientAlertInput {
    alertId: string;
    type?: AlertType;
    severity?: AlertSeverity;
    message?: string;
    isActive?: boolean;
}
export declare class UpdatePatientAlertUseCase {
    private readonly repo;
    constructor(repo: IPatientAlertRepository);
    execute(input: UpdatePatientAlertInput): Promise<PatientAlertEntity>;
}
