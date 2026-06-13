export declare const AlertType: {
    readonly ALLERGY: "ALLERGY";
    readonly MEDICAL_RISK: "MEDICAL_RISK";
    readonly SPECIAL_CONDITION: "SPECIAL_CONDITION";
    readonly ADMINISTRATIVE: "ADMINISTRATIVE";
};
export type AlertType = (typeof AlertType)[keyof typeof AlertType];
export declare const AlertSeverity: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
};
export type AlertSeverity = (typeof AlertSeverity)[keyof typeof AlertSeverity];
