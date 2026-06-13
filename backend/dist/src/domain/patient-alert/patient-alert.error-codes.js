"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientAlertErrorMessages = exports.PatientAlertErrorCode = void 0;
exports.patientAlertError = patientAlertError;
var PatientAlertErrorCode;
(function (PatientAlertErrorCode) {
    PatientAlertErrorCode["DUPLICATE_ACTIVE_ALERT"] = "PATIENT_ALERT_DUPLICATE_ACTIVE";
    PatientAlertErrorCode["PATIENT_NOT_FOUND"] = "PATIENT_NOT_FOUND";
    PatientAlertErrorCode["ALERT_NOT_FOUND"] = "PATIENT_ALERT_NOT_FOUND";
})(PatientAlertErrorCode || (exports.PatientAlertErrorCode = PatientAlertErrorCode = {}));
exports.PatientAlertErrorMessages = {
    [PatientAlertErrorCode.DUPLICATE_ACTIVE_ALERT]: 'Ya existe una alerta activa idéntica para este paciente',
    [PatientAlertErrorCode.PATIENT_NOT_FOUND]: 'Paciente no encontrado',
    [PatientAlertErrorCode.ALERT_NOT_FOUND]: 'Alerta no encontrada',
};
function patientAlertError(code) {
    return {
        code,
        message: exports.PatientAlertErrorMessages[code],
    };
}
//# sourceMappingURL=patient-alert.error-codes.js.map