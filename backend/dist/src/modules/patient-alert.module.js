"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientAlertModule = void 0;
const common_1 = require("@nestjs/common");
const create_patient_alert_use_case_1 = require("../application/patient-alert/create-patient-alert.use-case");
const delete_patient_alert_use_case_1 = require("../application/patient-alert/delete-patient-alert.use-case");
const get_patient_alerts_use_case_1 = require("../application/patient-alert/get-patient-alerts.use-case");
const update_patient_alert_use_case_1 = require("../application/patient-alert/update-patient-alert.use-case");
const patient_alert_repository_interface_1 = require("../domain/patient-alert/patient-alert.repository.interface");
const patient_alert_prisma_repository_1 = require("../infrastructure/prisma/patient-alert.prisma.repository");
const prisma_service_1 = require("../infrastructure/prisma/prisma.service");
const patient_alert_controller_1 = require("../presentation/patient-alert/patient-alert.controller");
let PatientAlertModule = class PatientAlertModule {
};
exports.PatientAlertModule = PatientAlertModule;
exports.PatientAlertModule = PatientAlertModule = __decorate([
    (0, common_1.Module)({
        controllers: [patient_alert_controller_1.PatientAlertController],
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: patient_alert_repository_interface_1.PATIENT_ALERT_REPOSITORY,
                useClass: patient_alert_prisma_repository_1.PatientAlertPrismaRepository,
            },
            get_patient_alerts_use_case_1.GetPatientAlertsUseCase,
            create_patient_alert_use_case_1.CreatePatientAlertUseCase,
            update_patient_alert_use_case_1.UpdatePatientAlertUseCase,
            delete_patient_alert_use_case_1.DeletePatientAlertUseCase,
        ],
    })
], PatientAlertModule);
//# sourceMappingURL=patient-alert.module.js.map