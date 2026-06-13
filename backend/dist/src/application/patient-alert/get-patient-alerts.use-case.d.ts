import { PatientAlertEntity } from '../../domain/patient-alert/patient-alert.entity';
import type { IPatientAlertRepository } from '../../domain/patient-alert/patient-alert.repository.interface';
export declare class GetPatientAlertsUseCase {
    private readonly repo;
    constructor(repo: IPatientAlertRepository);
    execute(patientId: string): Promise<PatientAlertEntity[]>;
}
