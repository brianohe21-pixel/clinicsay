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
exports.UpdatePatientAlertUseCase = void 0;
const common_1 = require("@nestjs/common");
const patient_alert_duplicate_policy_1 = require("../../domain/patient-alert/patient-alert-duplicate.policy");
const patient_alert_entity_1 = require("../../domain/patient-alert/patient-alert.entity");
const patient_alert_error_codes_1 = require("../../domain/patient-alert/patient-alert.error-codes");
const patient_alert_repository_interface_1 = require("../../domain/patient-alert/patient-alert.repository.interface");
let UpdatePatientAlertUseCase = class UpdatePatientAlertUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(input) {
        const existing = await this.repo.findById(input.alertId);
        if (!existing) {
            throw new common_1.NotFoundException((0, patient_alert_error_codes_1.patientAlertError)(patient_alert_error_codes_1.PatientAlertErrorCode.ALERT_NOT_FOUND));
        }
        const identity = (0, patient_alert_duplicate_policy_1.buildAlertIdentity)(input.type ?? existing.type, input.severity ?? existing.severity, input.message ?? existing.message);
        const updatedIsActive = input.isActive ?? existing.isActive;
        if (updatedIsActive) {
            const duplicate = await this.repo.findActiveByUniqueKey(existing.patientId, identity.type, identity.severity, identity.message);
            const isDifferentAlert = duplicate && duplicate.id !== existing.id;
            if (isDifferentAlert) {
                throw new common_1.ConflictException((0, patient_alert_error_codes_1.patientAlertError)(patient_alert_error_codes_1.PatientAlertErrorCode.DUPLICATE_ACTIVE_ALERT));
            }
        }
        const updated = patient_alert_entity_1.PatientAlertEntity.create({
            id: existing.id,
            patientId: existing.patientId,
            type: identity.type,
            severity: identity.severity,
            message: identity.message,
            isActive: updatedIsActive,
            createdAt: existing.createdAt,
            updatedAt: new Date(),
        });
        return this.repo.update(updated);
    }
};
exports.UpdatePatientAlertUseCase = UpdatePatientAlertUseCase;
exports.UpdatePatientAlertUseCase = UpdatePatientAlertUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(patient_alert_repository_interface_1.PATIENT_ALERT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdatePatientAlertUseCase);
//# sourceMappingURL=update-patient-alert.use-case.js.map