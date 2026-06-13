import { ConflictException, NotFoundException } from '@nestjs/common';
import { AlertSeverity } from '../../domain/patient-alert/alert-severity.enum';
import { AlertType } from '../../domain/patient-alert/alert-type.enum';
import { PatientAlertEntity } from '../../domain/patient-alert/patient-alert.entity';
import {
  PatientAlertErrorCode,
  PatientAlertErrorMessages,
} from '../../domain/patient-alert/patient-alert.error-codes';
import { PATIENT_ALERT_REPOSITORY } from '../../domain/patient-alert/patient-alert.repository.interface';
import { UpdatePatientAlertUseCase } from './update-patient-alert.use-case';

const mockAlert = PatientAlertEntity.create({
  id: 'alert-001',
  patientId: 'patient-001',
  type: AlertType.ALLERGY,
  severity: AlertSeverity.HIGH,
  message: 'Alergia a penicilina',
  isActive: false,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const conflictingAlert = PatientAlertEntity.create({
  id: 'alert-002',
  patientId: 'patient-001',
  type: AlertType.ALLERGY,
  severity: AlertSeverity.HIGH,
  message: 'Alergia a penicilina',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const mockRepo = {
  findByPatientId: jest.fn(),
  findById: jest.fn(),
  findActiveByUniqueKey: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UpdatePatientAlertUseCase', () => {
  let useCase: UpdatePatientAlertUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new UpdatePatientAlertUseCase(mockRepo);
  });

  it('should throw ConflictException when activating an alert that matches another active alert', async () => {
    mockRepo.findById.mockResolvedValue(mockAlert);
    mockRepo.findActiveByUniqueKey.mockResolvedValue(conflictingAlert);

    await expect(
      useCase.execute({
        alertId: 'alert-001',
        isActive: true,
      }),
    ).rejects.toMatchObject({
      response: {
        code: PatientAlertErrorCode.DUPLICATE_ACTIVE_ALERT,
        message:
          PatientAlertErrorMessages[
            PatientAlertErrorCode.DUPLICATE_ACTIVE_ALERT
          ],
      },
    });

    expect(mockRepo.update).not.toHaveBeenCalled();
  });

  it('should allow activating the same alert without conflict', async () => {
    const activeAlert = PatientAlertEntity.create({
      ...mockAlert.toJSON(),
      isActive: false,
    });

    mockRepo.findById.mockResolvedValue(activeAlert);
    mockRepo.findActiveByUniqueKey.mockResolvedValue(activeAlert);
    mockRepo.update.mockImplementation((alert: PatientAlertEntity) =>
      Promise.resolve(alert),
    );

    const result = await useCase.execute({
      alertId: 'alert-001',
      isActive: true,
    });

    expect(result.isActive).toBe(true);
    expect(mockRepo.update).toHaveBeenCalledTimes(1);
  });

  it('should throw NotFoundException when alert does not exist', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({
        alertId: 'missing',
        isActive: true,
      }),
    ).rejects.toMatchObject({
      response: {
        code: PatientAlertErrorCode.ALERT_NOT_FOUND,
        message:
          PatientAlertErrorMessages[PatientAlertErrorCode.ALERT_NOT_FOUND],
      },
    });
  });
});
