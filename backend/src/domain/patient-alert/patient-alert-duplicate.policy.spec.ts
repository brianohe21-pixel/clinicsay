import {
  buildAlertIdentity,
  findConflictingActiveAlert,
  normalizeAlertMessage,
} from './patient-alert-duplicate.policy';
import { AlertSeverity } from './alert-severity.enum';
import { AlertType } from './alert-type.enum';
import { PatientAlertEntity } from './patient-alert.entity';

describe('patient-alert-duplicate.policy', () => {
  const identity = buildAlertIdentity(
    AlertType.ALLERGY,
    AlertSeverity.HIGH,
    '  Alergia a penicilina  ',
  );

  it('normalizes message by trimming whitespace', () => {
    expect(normalizeAlertMessage('  test  ')).toBe('test');
    expect(identity.message).toBe('Alergia a penicilina');
  });

  it('detects conflicting active alerts with the same identity', () => {
    const alerts = [
      PatientAlertEntity.create({
        id: 'a1',
        patientId: 'p1',
        type: AlertType.ALLERGY,
        severity: AlertSeverity.HIGH,
        message: 'Alergia a penicilina',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      PatientAlertEntity.create({
        id: 'a2',
        patientId: 'p1',
        type: AlertType.ALLERGY,
        severity: AlertSeverity.HIGH,
        message: 'Alergia a penicilina',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];

    const conflict = findConflictingActiveAlert(alerts, identity, 'a2');

    expect(conflict?.id).toBe('a1');
  });

  it('does not treat inactive alerts as conflicts', () => {
    const alerts = [
      PatientAlertEntity.create({
        id: 'a1',
        patientId: 'p1',
        type: AlertType.ALLERGY,
        severity: AlertSeverity.HIGH,
        message: 'Alergia a penicilina',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];

    expect(findConflictingActiveAlert(alerts, identity)).toBeUndefined();
  });
});
