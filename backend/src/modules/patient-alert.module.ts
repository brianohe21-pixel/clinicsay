import { Module } from '@nestjs/common';
import { CreatePatientAlertUseCase } from '../application/patient-alert/create-patient-alert.use-case';
import { DeletePatientAlertUseCase } from '../application/patient-alert/delete-patient-alert.use-case';
import { GetPatientAlertsUseCase } from '../application/patient-alert/get-patient-alerts.use-case';
import { UpdatePatientAlertUseCase } from '../application/patient-alert/update-patient-alert.use-case';
import { PATIENT_ALERT_REPOSITORY } from '../domain/patient-alert/patient-alert.repository.interface';
import { PatientAlertPrismaRepository } from '../infrastructure/prisma/patient-alert.prisma.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { PatientAlertController } from '../presentation/patient-alert/patient-alert.controller';

@Module({
  controllers: [PatientAlertController],
  providers: [
    PrismaService,
    {
      provide: PATIENT_ALERT_REPOSITORY,
      useClass: PatientAlertPrismaRepository,
    },
    GetPatientAlertsUseCase,
    CreatePatientAlertUseCase,
    UpdatePatientAlertUseCase,
    DeletePatientAlertUseCase,
  ],
})
export class PatientAlertModule {}
