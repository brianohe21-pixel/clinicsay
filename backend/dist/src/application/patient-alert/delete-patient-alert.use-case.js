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
exports.DeletePatientAlertUseCase = void 0;
const common_1 = require("@nestjs/common");
const patient_alert_error_codes_1 = require("../../domain/patient-alert/patient-alert.error-codes");
const patient_alert_repository_interface_1 = require("../../domain/patient-alert/patient-alert.repository.interface");
let DeletePatientAlertUseCase = class DeletePatientAlertUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(alertId) {
        const existing = await this.repo.findById(alertId);
        if (!existing) {
            throw new common_1.NotFoundException((0, patient_alert_error_codes_1.patientAlertError)(patient_alert_error_codes_1.PatientAlertErrorCode.ALERT_NOT_FOUND));
        }
        await this.repo.delete(alertId);
    }
};
exports.DeletePatientAlertUseCase = DeletePatientAlertUseCase;
exports.DeletePatientAlertUseCase = DeletePatientAlertUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(patient_alert_repository_interface_1.PATIENT_ALERT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DeletePatientAlertUseCase);
//# sourceMappingURL=delete-patient-alert.use-case.js.map