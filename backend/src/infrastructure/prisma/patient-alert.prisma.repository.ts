import { Injectable } from '@nestjs/common';
import { AlertSeverity } from '../../domain/patient-alert/alert-severity.enum';
import { AlertType } from '../../domain/patient-alert/alert-type.enum';
import { PatientAlertEntity } from '../../domain/patient-alert/patient-alert.entity';
import { IPatientAlertRepository } from '../../domain/patient-alert/patient-alert.repository.interface';
import { PrismaService } from './prisma.service';

@Injectable()
export class PatientAlertPrismaRepository implements IPatientAlertRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByPatientId(patientId: string): Promise<PatientAlertEntity[]> {
    const records = await this.prisma.patientAlert.findMany({
      where: { patientId },
    });
    return records.map((record) => this.toEntity(record));
  }

  async findById(id: string): Promise<PatientAlertEntity | null> {
    const record = await this.prisma.patientAlert.findUnique({ where: { id } });
    return record ? this.toEntity(record) : null;
  }

  async findActiveByUniqueKey(
    patientId: string,
    type: AlertType,
    severity: AlertSeverity,
    message: string,
  ): Promise<PatientAlertEntity | null> {
    const record = await this.prisma.patientAlert.findFirst({
      where: { patientId, type, severity, message, isActive: true },
    });
    return record ? this.toEntity(record) : null;
  }

  async save(alert: PatientAlertEntity): Promise<PatientAlertEntity> {
    const record = await this.prisma.patientAlert.create({
      data: {
        id: alert.id,
        patientId: alert.patientId,
        type: alert.type,
        severity: alert.severity,
        message: alert.message,
        isActive: alert.isActive,
        createdAt: alert.createdAt,
        updatedAt: alert.updatedAt,
      },
    });
    return this.toEntity(record);
  }

  async update(alert: PatientAlertEntity): Promise<PatientAlertEntity> {
    const record = await this.prisma.patientAlert.update({
      where: { id: alert.id },
      data: {
        type: alert.type,
        severity: alert.severity,
        message: alert.message,
        isActive: alert.isActive,
        updatedAt: alert.updatedAt,
      },
    });
    return this.toEntity(record);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.patientAlert.delete({ where: { id } });
  }

  private toEntity(record: {
    id: string;
    patientId: string;
    type: string;
    severity: string;
    message: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }): PatientAlertEntity {
    return PatientAlertEntity.create({
      id: record.id,
      patientId: record.patientId,
      type: record.type as AlertType,
      severity: record.severity as AlertSeverity,
      message: record.message,
      isActive: record.isActive,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
