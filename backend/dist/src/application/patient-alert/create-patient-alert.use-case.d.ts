import { AlertSeverity } from '../../domain/patient-alert/alert-severity.enum';
import { AlertType } from '../../domain/patient-alert/alert-type.enum';
import { PatientAlertEntity } from '../../domain/patient-alert/patient-alert.entity';
import type { IPatientAlertRepository } from '../../domain/patient-alert/patient-alert.repository.interface';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
export interface CreatePatientAlertInput {
    patientId: string;
    type: AlertType;
    severity: AlertSeverity;
    message: string;
    isActive: boolean;
}
export declare class CreatePatientAlertUseCase {
    private readonly repo;
    private readonly prisma;
    constructor(repo: IPatientAlertRepository, prisma: PrismaService);
    execute(input: CreatePatientAlertInput): Promise<PatientAlertEntity>;
}
