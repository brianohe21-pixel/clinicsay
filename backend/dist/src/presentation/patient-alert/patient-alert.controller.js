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
exports.PatientAlertController = void 0;
const common_1 = require("@nestjs/common");
const create_patient_alert_use_case_1 = require("../../application/patient-alert/create-patient-alert.use-case");
const delete_patient_alert_use_case_1 = require("../../application/patient-alert/delete-patient-alert.use-case");
const get_patient_alerts_use_case_1 = require("../../application/patient-alert/get-patient-alerts.use-case");
const update_patient_alert_use_case_1 = require("../../application/patient-alert/update-patient-alert.use-case");
const create_alert_dto_1 = require("./dtos/create-alert.dto");
const update_alert_dto_1 = require("./dtos/update-alert.dto");
let PatientAlertController = class PatientAlertController {
    getAlertsUseCase;
    createAlertUseCase;
    updateAlertUseCase;
    deleteAlertUseCase;
    constructor(getAlertsUseCase, createAlertUseCase, updateAlertUseCase, deleteAlertUseCase) {
        this.getAlertsUseCase = getAlertsUseCase;
        this.createAlertUseCase = createAlertUseCase;
        this.updateAlertUseCase = updateAlertUseCase;
        this.deleteAlertUseCase = deleteAlertUseCase;
    }
    async getAlerts(patientId) {
        const alerts = await this.getAlertsUseCase.execute(patientId);
        return alerts.map((a) => a.toJSON());
    }
    async createAlert(patientId, dto) {
        const alert = await this.createAlertUseCase.execute({
            patientId,
            type: dto.type,
            severity: dto.severity,
            message: dto.message,
            isActive: dto.isActive,
        });
        return alert.toJSON();
    }
    async updateAlert(alertId, dto) {
        const alert = await this.updateAlertUseCase.execute({
            alertId,
            type: dto.type,
            severity: dto.severity,
            message: dto.message,
            isActive: dto.isActive,
        });
        return alert.toJSON();
    }
    async deleteAlert(alertId) {
        await this.deleteAlertUseCase.execute(alertId);
    }
};
exports.PatientAlertController = PatientAlertController;
__decorate([
    (0, common_1.Get)('patients/:patientId/alerts'),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientAlertController.prototype, "getAlerts", null);
__decorate([
    (0, common_1.Post)('patients/:patientId/alerts'),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_alert_dto_1.CreateAlertDto]),
    __metadata("design:returntype", Promise)
], PatientAlertController.prototype, "createAlert", null);
__decorate([
    (0, common_1.Patch)('patient-alerts/:alertId'),
    __param(0, (0, common_1.Param)('alertId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_alert_dto_1.UpdateAlertDto]),
    __metadata("design:returntype", Promise)
], PatientAlertController.prototype, "updateAlert", null);
__decorate([
    (0, common_1.Delete)('patient-alerts/:alertId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('alertId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientAlertController.prototype, "deleteAlert", null);
exports.PatientAlertController = PatientAlertController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [get_patient_alerts_use_case_1.GetPatientAlertsUseCase,
        create_patient_alert_use_case_1.CreatePatientAlertUseCase,
        update_patient_alert_use_case_1.UpdatePatientAlertUseCase,
        delete_patient_alert_use_case_1.DeletePatientAlertUseCase])
], PatientAlertController);
//# sourceMappingURL=patient-alert.controller.js.map