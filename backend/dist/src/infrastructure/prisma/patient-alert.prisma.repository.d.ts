import { AlertSeverity } from '../../domain/patient-alert/alert-severity.enum';
import { AlertType } from '../../domain/patient-alert/alert-type.enum';
import { PatientAlertEntity } from '../../domain/patient-alert/patient-alert.entity';
import { IPatientAlertRepository } from '../../domain/patient-alert/patient-alert.repository.interface';
import { PrismaService } from './prisma.service';
export declare class PatientAlertPrismaRepository implements IPatientAlertRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByPatientId(patientId: string): Promise<PatientAlertEntity[]>;
    findById(id: string): Promise<PatientAlertEntity | null>;
    findActiveByUniqueKey(patientId: string, type: AlertType, severity: AlertSeverity, message: string): Promise<PatientAlertEntity | null>;
    save(alert: PatientAlertEntity): Promise<PatientAlertEntity>;
    update(alert: PatientAlertEntity): Promise<PatientAlertEntity>;
    delete(id: string): Promise<void>;
    private toEntity;
}
