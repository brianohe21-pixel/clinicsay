import { ConflictException, NotFoundException } from '@nestjs/common';
import { AlertSeverity } from '../../domain/patient-alert/alert-severity.enum';
import { AlertType } from '../../domain/patient-alert/alert-type.enum';
import { PatientAlertEntity } from '../../domain/patient-alert/patient-alert.entity';
import {
  PatientAlertErrorCode,
  PatientAlertErrorMessages,
} from '../../domain/patient-alert/patient-alert.error-codes';
import { PATIENT_ALERT_REPOSITORY } from '../../domain/patient-alert/patient-alert.repository.interface';
import { CreatePatientAlertUseCase } from './create-patient-alert.use-case';
import {
  createMockPatientAlertRepository,
  createMockPrismaPatientLookup,
  toPrismaService,
} from '../../../test/mocks';

const mockPatient = {
  id: 'patient-001',
  name: 'Ana Torres',
  dni: '12345678',
  age: 34,
  location: 'Sede Miraflores',
  createdAt: new Date(),
  updatedAt: new Date(),
};

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

const mockRepo = createMockPatientAlertRepository();
const mockPrismaService = createMockPrismaPatientLookup();

describe('CreatePatientAlertUseCase', () => {
  let useCase: CreatePatientAlertUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new CreatePatientAlertUseCase(
      mockRepo,
      toPrismaService(mockPrismaService),
    );
  });

  it('should throw ConflictException when an identical active alert already exists', async () => {
    mockPrismaService.patient.findUnique.mockResolvedValue(mockPatient);
    mockRepo.findActiveByUniqueKey.mockResolvedValue(mockAlert);

    await expect(
      useCase.execute({
        patientId: 'patient-001',
        type: AlertType.ALLERGY,
        severity: AlertSeverity.HIGH,
        message: 'Alergia a penicilina',
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

    expect(mockRepo.findActiveByUniqueKey).toHaveBeenCalledWith(
      'patient-001',
      AlertType.ALLERGY,
      AlertSeverity.HIGH,
      'Alergia a penicilina',
    );
    expect(mockRepo.save).not.toHaveBeenCalled();
  });

  it('should create and save alert when no duplicate exists', async () => {
    mockPrismaService.patient.findUnique.mockResolvedValue(mockPatient);
    mockRepo.findActiveByUniqueKey.mockResolvedValue(null);
    mockRepo.save.mockImplementation((alert: PatientAlertEntity) =>
      Promise.resolve(alert),
    );

    const result = await useCase.execute({
      patientId: 'patient-001',
      type: AlertType.MEDICAL_RISK,
      severity: AlertSeverity.MEDIUM,
      message: 'Riesgo cardiovascular',
      isActive: true,
    });

    expect(mockRepo.save).toHaveBeenCalledTimes(1);
    expect(result.patientId).toBe('patient-001');
    expect(result.type).toBe(AlertType.MEDICAL_RISK);
    expect(result.severity).toBe(AlertSeverity.MEDIUM);
    expect(result.isActive).toBe(true);
  });

  it('should allow creating inactive alert even when identical active alert exists', async () => {
    mockPrismaService.patient.findUnique.mockResolvedValue(mockPatient);
    mockRepo.save.mockImplementation((alert: PatientAlertEntity) =>
      Promise.resolve(alert),
    );

    const result = await useCase.execute({
      patientId: 'patient-001',
      type: AlertType.ALLERGY,
      severity: AlertSeverity.HIGH,
      message: 'Alergia a penicilina',
      isActive: false,
    });

    expect(mockRepo.findActiveByUniqueKey).not.toHaveBeenCalled();
    expect(mockRepo.save).toHaveBeenCalledTimes(1);
    expect(result.isActive).toBe(false);
  });

  it('should normalize message before duplicate check', async () => {
    mockPrismaService.patient.findUnique.mockResolvedValue(mockPatient);
    mockRepo.findActiveByUniqueKey.mockResolvedValue(mockAlert);

    await expect(
      useCase.execute({
        patientId: 'patient-001',
        type: AlertType.ALLERGY,
        severity: AlertSeverity.HIGH,
        message: '  Alergia a penicilina  ',
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

    expect(mockRepo.findActiveByUniqueKey).toHaveBeenCalledWith(
      'patient-001',
      AlertType.ALLERGY,
      AlertSeverity.HIGH,
      'Alergia a penicilina',
    );
  });

  it('should throw NotFoundException when patient does not exist', async () => {
    mockPrismaService.patient.findUnique.mockResolvedValue(null);

    await expect(
      useCase.execute({
        patientId: 'non-existent',
        type: AlertType.ALLERGY,
        severity: AlertSeverity.HIGH,
        message: 'Test',
        isActive: true,
      }),
    ).rejects.toMatchObject({
      response: {
        code: PatientAlertErrorCode.PATIENT_NOT_FOUND,
        message:
          PatientAlertErrorMessages[PatientAlertErrorCode.PATIENT_NOT_FOUND],
      },
    });

    expect(mockRepo.save).not.toHaveBeenCalled();
  });
});
