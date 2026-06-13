import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

export interface UpdatePatientAlertInput {
  alertId: string;
  type?: AlertType;
  severity?: AlertSeverity;
  message?: string;
  isActive?: boolean;
}

@Injectable()
export class UpdatePatientAlertUseCase {
  constructor(
    @Inject(PATIENT_ALERT_REPOSITORY)
    private readonly repo: IPatientAlertRepository,
  ) {}

  async execute(input: UpdatePatientAlertInput): Promise<PatientAlertEntity> {
    const existing = await this.repo.findById(input.alertId);

    if (!existing) {
      throw new NotFoundException(
        patientAlertError(PatientAlertErrorCode.ALERT_NOT_FOUND),
      );
    }

    const identity = buildAlertIdentity(
      input.type ?? existing.type,
      input.severity ?? existing.severity,
      input.message ?? existing.message,
    );
    const updatedIsActive = input.isActive ?? existing.isActive;

    if (updatedIsActive) {
      const duplicate = await this.repo.findActiveByUniqueKey(
        existing.patientId,
        identity.type,
        identity.severity,
        identity.message,
      );

      const isDifferentAlert = duplicate && duplicate.id !== existing.id;
      if (isDifferentAlert) {
        throw new ConflictException(
          patientAlertError(PatientAlertErrorCode.DUPLICATE_ACTIVE_ALERT),
        );
      }
    }

    const updated = PatientAlertEntity.create({
      id: existing.id,
      patientId: existing.patientId,
      type: identity.type,
      severity: identity.severity,
      message: identity.message,
      isActive: updatedIsActive,
      createdAt: existing.createdAt,
      updatedAt: new Date(),
    });

    return this.repo.update(updated);
  }
}
