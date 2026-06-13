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
exports.GetPatientAlertsUseCase = void 0;
const common_1 = require("@nestjs/common");
const alert_severity_enum_1 = require("../../domain/patient-alert/alert-severity.enum");
const patient_alert_repository_interface_1 = require("../../domain/patient-alert/patient-alert.repository.interface");
let GetPatientAlertsUseCase = class GetPatientAlertsUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(patientId) {
        const alerts = await this.repo.findByPatientId(patientId);
        return alerts.sort((a, b) => {
            if (a.isActive !== b.isActive) {
                return a.isActive ? -1 : 1;
            }
            return alert_severity_enum_1.SEVERITY_ORDER[a.severity] - alert_severity_enum_1.SEVERITY_ORDER[b.severity];
        });
    }
};
exports.GetPatientAlertsUseCase = GetPatientAlertsUseCase;
exports.GetPatientAlertsUseCase = GetPatientAlertsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(patient_alert_repository_interface_1.PATIENT_ALERT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetPatientAlertsUseCase);
//# sourceMappingURL=get-patient-alerts.use-case.js.map