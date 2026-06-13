import { AlertSeverity } from './alert-severity.enum';
import { AlertType } from './alert-type.enum';
export interface PatientAlertProps {
    id: string;
    patientId: string;
    type: AlertType;
    severity: AlertSeverity;
    message: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PatientAlertEntity {
    private readonly props;
    private constructor();
    static create(props: PatientAlertProps): PatientAlertEntity;
    get id(): string;
    get patientId(): string;
    get type(): AlertType;
    get severity(): AlertSeverity;
    get message(): string;
    get isActive(): boolean;
    get createdAt(): Date;
    get updatedAt(): Date;
    isSameActiveAlert(type: AlertType, severity: AlertSeverity, message: string): boolean;
    toJSON(): PatientAlertProps;
}
