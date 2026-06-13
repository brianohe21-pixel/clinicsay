import { Inject, Injectable } from '@nestjs/common';
import { SEVERITY_ORDER } from '../../domain/patient-alert/alert-severity.enum';
import { PatientAlertEntity } from '../../domain/patient-alert/patient-alert.entity';
import type { IPatientAlertRepository } from '../../domain/patient-alert/patient-alert.repository.interface';
import { PATIENT_ALERT_REPOSITORY } from '../../domain/patient-alert/patient-alert.repository.interface';

@Injectable()
export class GetPatientAlertsUseCase {
  constructor(
    @Inject(PATIENT_ALERT_REPOSITORY)
    private readonly repo: IPatientAlertRepository,
  ) {}

  async execute(patientId: string): Promise<PatientAlertEntity[]> {
    const alerts = await this.repo.findByPatientId(patientId);

    return alerts.sort((a, b) => {
      if (a.isActive !== b.isActive) {
        return a.isActive ? -1 : 1;
      }
      return SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
    });
  }
}
