import {
  ConflictException,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AlertSeverity } from '../src/domain/patient-alert/alert-severity.enum';
import { AlertType } from '../src/domain/patient-alert/alert-type.enum';
import { PatientAlertEntity } from '../src/domain/patient-alert/patient-alert.entity';
import { PatientAlertErrorCode } from '../src/domain/patient-alert/patient-alert.error-codes';
import { PATIENT_ALERT_REPOSITORY } from '../src/domain/patient-alert/patient-alert.repository.interface';
import { PrismaService } from '../src/infrastructure/prisma/prisma.service';
import { PatientAlertModule } from '../src/modules/patient-alert.module';

const PATIENT_ID = 'mock-patient-001';

const mockPatient = {
  id: PATIENT_ID,
  name: 'Ana Torres',
  dni: '12345678',
  age: 34,
  location: 'Sede Miraflores',
  createdAt: new Date(),
  updatedAt: new Date(),
};

function makeAlert(
  overrides: Partial<ReturnType<PatientAlertEntity['toJSON']>> = {},
): PatientAlertEntity {
  return PatientAlertEntity.create({
    id: 'alert-001',
    patientId: PATIENT_ID,
    type: AlertType.ALLERGY,
    severity: AlertSeverity.HIGH,
    message: 'Alergia a penicilina',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
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

const mockPrismaService = {
  patient: {
    findUnique: jest.fn(),
  },
};

describe('PatientAlertController (e2e)', () => {
  let app: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PatientAlertModule],
    })
      .overrideProvider(PATIENT_ALERT_REPOSITORY)
      .useValue(mockRepo)
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /patients/:patientId/alerts', () => {
    const validBody = {
      type: AlertType.ALLERGY,
      severity: AlertSeverity.HIGH,
      message: 'Alergia a penicilina',
      isActive: true,
    };

    it('should return 201 and the created alert', async () => {
      mockPrismaService.patient.findUnique.mockResolvedValue(mockPatient);
      mockRepo.findActiveByUniqueKey.mockResolvedValue(null);
      mockRepo.save.mockImplementation((alert: PatientAlertEntity) =>
        Promise.resolve(alert),
      );

      const res = await request(app.getHttpServer())
        .post(`/patients/${PATIENT_ID}/alerts`)
        .send(validBody)
        .expect(201);

      expect(res.body).toMatchObject({
        patientId: PATIENT_ID,
        type: AlertType.ALLERGY,
        severity: AlertSeverity.HIGH,
        message: 'Alergia a penicilina',
        isActive: true,
      });
    });

    it('should return 409 when duplicate active alert exists', async () => {
      mockPrismaService.patient.findUnique.mockResolvedValue(mockPatient);
      mockRepo.findActiveByUniqueKey.mockResolvedValue(makeAlert());

      const res = await request(app.getHttpServer())
        .post(`/patients/${PATIENT_ID}/alerts`)
        .send(validBody)
        .expect(409);

      expect(res.body).toMatchObject({
        code: PatientAlertErrorCode.DUPLICATE_ACTIVE_ALERT,
        message: expect.any(String),
      });
    });

    it('should return 400 when body is invalid (missing required fields)', async () => {
      await request(app.getHttpServer())
        .post(`/patients/${PATIENT_ID}/alerts`)
        .send({ type: 'INVALID_TYPE' })
        .expect(400);
    });

    it('should return 404 when patient does not exist', async () => {
      mockPrismaService.patient.findUnique.mockResolvedValue(null);

      await request(app.getHttpServer())
        .post(`/patients/non-existent/alerts`)
        .send(validBody)
        .expect(404);
    });
  });

  describe('GET /patients/:patientId/alerts', () => {
    it('should return sorted list of alerts with active alerts first', async () => {
      const alerts = [
        makeAlert({ id: 'a1', severity: AlertSeverity.LOW, isActive: false }),
        makeAlert({ id: 'a2', severity: AlertSeverity.HIGH, isActive: true }),
        makeAlert({ id: 'a3', severity: AlertSeverity.MEDIUM, isActive: true }),
      ];
      mockRepo.findByPatientId.mockResolvedValue(alerts);

      const res = await request(app.getHttpServer())
        .get(`/patients/${PATIENT_ID}/alerts`)
        .expect(200);

      expect(res.body).toHaveLength(3);
      expect(res.body[0].isActive).toBe(true);
      expect(res.body[1].isActive).toBe(true);
      expect(res.body[2].isActive).toBe(false);
    });
  });

  describe('PATCH /patient-alerts/:alertId', () => {
    it('should return 409 when update would create duplicate active alert', async () => {
      const inactiveAlert = makeAlert({
        id: 'alert-inactive',
        isActive: false,
      });
      const activeAlert = makeAlert({ id: 'alert-active', isActive: true });

      mockRepo.findById.mockResolvedValue(inactiveAlert);
      mockRepo.findActiveByUniqueKey.mockResolvedValue(activeAlert);

      const res = await request(app.getHttpServer())
        .patch('/patient-alerts/alert-inactive')
        .send({ isActive: true })
        .expect(409);

      expect(res.body).toMatchObject({
        code: PatientAlertErrorCode.DUPLICATE_ACTIVE_ALERT,
        message: expect.any(String),
      });
    });
  });
});
