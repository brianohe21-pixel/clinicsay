import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PatientAlertErrorCode,
  patientAlertError,
} from '../../domain/patient-alert/patient-alert.error-codes';
import type { IPatientAlertRepository } from '../../domain/patient-alert/patient-alert.repository.interface';
import { PATIENT_ALERT_REPOSITORY } from '../../domain/patient-alert/patient-alert.repository.interface';

@Injectable()
export class DeletePatientAlertUseCase {
  constructor(
    @Inject(PATIENT_ALERT_REPOSITORY)
    private readonly repo: IPatientAlertRepository,
  ) {}

  async execute(alertId: string): Promise<void> {
    const existing = await this.repo.findById(alertId);

    if (!existing) {
      throw new NotFoundException(
        patientAlertError(PatientAlertErrorCode.ALERT_NOT_FOUND),
      );
    }

    await this.repo.delete(alertId);
  }
}
