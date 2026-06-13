import { AlertSeverity } from '../../domain/patient-alert/alert-severity.enum';
import { AlertType } from '../../domain/patient-alert/alert-type.enum';
import { PatientAlertEntity } from '../../domain/patient-alert/patient-alert.entity';
import { PATIENT_ALERT_REPOSITORY } from '../../domain/patient-alert/patient-alert.repository.interface';
import { GetPatientAlertsUseCase } from './get-patient-alerts.use-case';

function makeAlert(
  id: string,
  severity: AlertSeverity,
  isActive: boolean,
): PatientAlertEntity {
  return PatientAlertEntity.create({
    id,
    patientId: 'patient-001',
    type: AlertType.ALLERGY,
    severity,
    message: `Alerta ${id}`,
    isActive,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

const mockRepo = {
  findByPatientId: jest.fn(),
  findById: jest.fn(),
  findActiveByUniqueKey: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('GetPatientAlertsUseCase', () => {
  let useCase: GetPatientAlertsUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new GetPatientAlertsUseCase(mockRepo);
  });

  it('should return active alerts first, then inactive', async () => {
    mockRepo.findByPatientId.mockResolvedValue([
      makeAlert('inactive', AlertSeverity.HIGH, false),
      makeAlert('active-low', AlertSeverity.LOW, true),
      makeAlert('active-high', AlertSeverity.HIGH, true),
    ]);

    const result = await useCase.execute('patient-001');

    expect(result.map((a) => a.id)).toEqual([
      'active-high',
      'active-low',
      'inactive',
    ]);
  });

  it('should sort active alerts by severity (HIGH before MEDIUM before LOW)', async () => {
    mockRepo.findByPatientId.mockResolvedValue([
      makeAlert('low', AlertSeverity.LOW, true),
      makeAlert('high', AlertSeverity.HIGH, true),
      makeAlert('medium', AlertSeverity.MEDIUM, true),
    ]);

    const result = await useCase.execute('patient-001');

    expect(result.map((a) => a.severity)).toEqual([
      AlertSeverity.HIGH,
      AlertSeverity.MEDIUM,
      AlertSeverity.LOW,
    ]);
  });
});
