import { NotFoundException } from '@nestjs/common';
import {
  PatientAlertErrorCode,
  PatientAlertErrorMessages,
} from '../../domain/patient-alert/patient-alert.error-codes';
import { AlertSeverity } from '../../domain/patient-alert/alert-severity.enum';
import { AlertType } from '../../domain/patient-alert/alert-type.enum';
import { PatientAlertEntity } from '../../domain/patient-alert/patient-alert.entity';
import { PATIENT_ALERT_REPOSITORY } from '../../domain/patient-alert/patient-alert.repository.interface';
import { DeletePatientAlertUseCase } from './delete-patient-alert.use-case';

const mockAlert = PatientAlertEntity.create({
  id: 'alert-001',
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

describe('DeletePatientAlertUseCase', () => {
  let useCase: DeletePatientAlertUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new DeletePatientAlertUseCase(mockRepo);
  });

  it('should delete alert when it exists', async () => {
    mockRepo.findById.mockResolvedValue(mockAlert);
    mockRepo.delete.mockResolvedValue(undefined);

    await useCase.execute('alert-001');

    expect(mockRepo.delete).toHaveBeenCalledWith('alert-001');
  });

  it('should throw NotFoundException when alert does not exist', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute('missing')).rejects.toMatchObject({
      response: {
        code: PatientAlertErrorCode.ALERT_NOT_FOUND,
        message:
          PatientAlertErrorMessages[PatientAlertErrorCode.ALERT_NOT_FOUND],
      },
    });

    expect(mockRepo.delete).not.toHaveBeenCalled();
  });
});
