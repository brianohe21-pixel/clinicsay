import { AlertSeverity } from '../../../domain/patient-alert/alert-severity.enum';
import { AlertType } from '../../../domain/patient-alert/alert-type.enum';
export declare class UpdateAlertDto {
    type?: AlertType;
    severity?: AlertSeverity;
    message?: string;
    isActive?: boolean;
}
