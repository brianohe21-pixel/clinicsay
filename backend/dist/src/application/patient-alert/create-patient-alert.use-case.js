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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePatientAlertUseCase = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const patient_alert_duplicate_policy_1 = require("../../domain/patient-alert/patient-alert-duplicate.policy");
const patient_alert_entity_1 = require("../../domain/patient-alert/patient-alert.entity");
const patient_alert_error_codes_1 = require("../../domain/patient-alert/patient-alert.error-codes");
const patient_alert_repository_interface_1 = require("../../domain/patient-alert/patient-alert.repository.interface");
const prisma_service_1 = require("../../infrastructure/prisma/prisma.service");
let CreatePatientAlertUseCase = class CreatePatientAlertUseCase {
    repo;
    prisma;
    constructor(repo, prisma) {
        this.repo = repo;
        this.prisma = prisma;
    }
    async execute(input) {
        const patientExists = await this.prisma.patient.findUnique({
            where: { id: input.patientId },
        });
        if (!patientExists) {
            throw new common_1.NotFoundException((0, patient_alert_error_codes_1.patientAlertError)(patient_alert_error_codes_1.PatientAlertErrorCode.PATIENT_NOT_FOUND));
        }
        const identity = (0, patient_alert_duplicate_policy_1.buildAlertIdentity)(input.type, input.severity, input.message);
        if (input.isActive) {
            const duplicate = await this.repo.findActiveByUniqueKey(input.patientId, identity.type, identity.severity, identity.message);
            if (duplicate) {
                throw new common_1.ConflictException((0, patient_alert_error_codes_1.patientAlertError)(patient_alert_error_codes_1.PatientAlertErrorCode.DUPLICATE_ACTIVE_ALERT));
            }
        }
        const now = new Date();
        const alert = patient_alert_entity_1.PatientAlertEntity.create({
            id: (0, crypto_1.randomUUID)(),
            patientId: input.patientId,
            type: identity.type,
            severity: identity.severity,
            message: identity.message,
            isActive: input.isActive,
            createdAt: now,
            updatedAt: now,
        });
        return this.repo.save(alert);
    }
};
exports.CreatePatientAlertUseCase = CreatePatientAlertUseCase;
exports.CreatePatientAlertUseCase = CreatePatientAlertUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(patient_alert_repository_interface_1.PATIENT_ALERT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, prisma_service_1.PrismaService])
], CreatePatientAlertUseCase);
//# sourceMappingURL=create-patient-alert.use-case.js.map