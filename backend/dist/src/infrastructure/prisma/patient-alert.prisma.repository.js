"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientAlertPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const patient_alert_entity_1 = require("../../domain/patient-alert/patient-alert.entity");
const prisma_service_1 = require("./prisma.service");
let PatientAlertPrismaRepository = class PatientAlertPrismaRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByPatientId(patientId) {
        const records = await this.prisma.patientAlert.findMany({
            where: { patientId },
        });
        return records.map((record) => this.toEntity(record));
    }
    async findById(id) {
        const record = await this.prisma.patientAlert.findUnique({ where: { id } });
        return record ? this.toEntity(record) : null;
    }
    async findActiveByUniqueKey(patientId, type, severity, message) {
        const record = await this.prisma.patientAlert.findFirst({
            where: { patientId, type, severity, message, isActive: true },
        });
        return record ? this.toEntity(record) : null;
    }
    async save(alert) {
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
    async update(alert) {
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
    async delete(id) {
        await this.prisma.patientAlert.delete({ where: { id } });
    }
    toEntity(record) {
        return patient_alert_entity_1.PatientAlertEntity.create({
            id: record.id,
            patientId: record.patientId,
            type: record.type,
            severity: record.severity,
            message: record.message,
            isActive: record.isActive,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
        });
    }
};
exports.PatientAlertPrismaRepository = PatientAlertPrismaRepository;
exports.PatientAlertPrismaRepository = PatientAlertPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientAlertPrismaRepository);
//# sourceMappingURL=patient-alert.prisma.repository.js.map