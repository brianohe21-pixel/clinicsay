import type { IPatientAlertRepository } from '../src/domain/patient-alert/patient-alert.repository.interface';
import { PrismaService } from '../src/infrastructure/prisma/prisma.service';

export type MockPatientAlertRepository = jest.Mocked<IPatientAlertRepository>;

export type MockPrismaPatientLookup = jest.Mocked<
  Pick<PrismaService, 'patient'>
>;

export function createMockPatientAlertRepository(): MockPatientAlertRepository {
  return {
    findByPatientId: jest.fn(),
    findById: jest.fn(),
    findActiveByUniqueKey: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
}

export function createMockPrismaPatientLookup(): MockPrismaPatientLookup {
  return {
    patient: {
      findUnique: jest.fn(),
    },
  };
}

export function toPrismaService(mock: MockPrismaPatientLookup): PrismaService {
  return mock as PrismaService;
}
