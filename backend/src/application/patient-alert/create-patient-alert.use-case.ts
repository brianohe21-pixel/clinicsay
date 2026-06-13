import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AlertSeverity } from '../../domain/patient-alert/alert-severity.enum';
import { AlertType } from '../../domain/patient-alert/alert-type.enum';
import { buildAlertIdentity } from '../../domain/patient-alert/patient-alert-duplicate.policy';
import { PatientAlertEntity } from '../../domain/patient-alert/patient-alert.entity';
import {
  PatientAlertErrorCode,
  patientAlertError,
} from '../../domain/patient-alert/patient-alert.error-codes';
import type { IPatientAlertRepository } from '../../domain/patient-alert/patient-alert.repository.interface';
import { PATIENT_ALERT_REPOSITORY } from '../../domain/patient-alert/patient-alert.repository.interface';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

export interface CreatePatientAlertInput {
  patientId: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  isActive: boolean;
}

@Injectable()
export class CreatePatientAlertUseCase {
  constructor(
    @Inject(PATIENT_ALERT_REPOSITORY)
    private readonly repo: IPatientAlertRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(input: CreatePatientAlertInput): Promise<PatientAlertEntity> {
    const patientExists = await this.prisma.patient.findUnique({
      where: { id: input.patientId },
    });

    if (!patientExists) {
      throw new NotFoundException(
        patientAlertError(PatientAlertErrorCode.PATIENT_NOT_FOUND),
      );
    }

    const identity = buildAlertIdentity(
      input.type,
      input.severity,
      input.message,
    );

    if (input.isActive) {
      const duplicate = await this.repo.findActiveByUniqueKey(
        input.patientId,
        identity.type,
        identity.severity,
        identity.message,
      );

      if (duplicate) {
        throw new ConflictException(
          patientAlertError(PatientAlertErrorCode.DUPLICATE_ACTIVE_ALERT),
        );
      }
    }

    const now = new Date();
    const alert = PatientAlertEntity.create({
      id: randomUUID(),
      patientId: input.patientId,
      type: identity.type,
      severity: identity.severity,
      message: identity.message,
      isActive: input.isActive,
      createdAt: now,
      updatedAt: now,
    });

    return this.repo.save(alert);
  }
}
