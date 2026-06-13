export declare enum PatientAlertErrorCode {
    DUPLICATE_ACTIVE_ALERT = "PATIENT_ALERT_DUPLICATE_ACTIVE",
    PATIENT_NOT_FOUND = "PATIENT_NOT_FOUND",
    ALERT_NOT_FOUND = "PATIENT_ALERT_NOT_FOUND"
}
export declare const PatientAlertErrorMessages: Record<PatientAlertErrorCode, string>;
export declare function patientAlertError(code: PatientAlertErrorCode): {
    code: PatientAlertErrorCode;
    message: string;
};
