import { CreatePatientAlertUseCase } from '../../application/patient-alert/create-patient-alert.use-case';
import { DeletePatientAlertUseCase } from '../../application/patient-alert/delete-patient-alert.use-case';
import { GetPatientAlertsUseCase } from '../../application/patient-alert/get-patient-alerts.use-case';
import { UpdatePatientAlertUseCase } from '../../application/patient-alert/update-patient-alert.use-case';
import { CreateAlertDto } from './dtos/create-alert.dto';
import { UpdateAlertDto } from './dtos/update-alert.dto';
export declare class PatientAlertController {
    private readonly getAlertsUseCase;
    private readonly createAlertUseCase;
    private readonly updateAlertUseCase;
    private readonly deleteAlertUseCase;
    constructor(getAlertsUseCase: GetPatientAlertsUseCase, createAlertUseCase: CreatePatientAlertUseCase, updateAlertUseCase: UpdatePatientAlertUseCase, deleteAlertUseCase: DeletePatientAlertUseCase);
    getAlerts(patientId: string): Promise<import("../../domain/patient-alert/patient-alert.entity").PatientAlertProps[]>;
    createAlert(patientId: string, dto: CreateAlertDto): Promise<import("../../domain/patient-alert/patient-alert.entity").PatientAlertProps>;
    updateAlert(alertId: string, dto: UpdateAlertDto): Promise<import("../../domain/patient-alert/patient-alert.entity").PatientAlertProps>;
    deleteAlert(alertId: string): Promise<void>;
}
