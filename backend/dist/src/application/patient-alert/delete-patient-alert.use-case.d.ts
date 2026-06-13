import type { IPatientAlertRepository } from '../../domain/patient-alert/patient-alert.repository.interface';
export declare class DeletePatientAlertUseCase {
    private readonly repo;
    constructor(repo: IPatientAlertRepository);
    execute(alertId: string): Promise<void>;
}
