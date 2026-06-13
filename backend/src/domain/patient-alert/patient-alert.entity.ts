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

export class PatientAlertEntity {
  private constructor(private readonly props: PatientAlertProps) {}

  static create(props: PatientAlertProps): PatientAlertEntity {
    return new PatientAlertEntity(props);
  }

  get id(): string {
    return this.props.id;
  }

  get patientId(): string {
    return this.props.patientId;
  }

  get type(): AlertType {
    return this.props.type;
  }

  get severity(): AlertSeverity {
    return this.props.severity;
  }

  get message(): string {
    return this.props.message;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  isSameActiveAlert(
    type: AlertType,
    severity: AlertSeverity,
    message: string,
  ): boolean {
    return (
      this.props.isActive &&
      this.props.type === type &&
      this.props.severity === severity &&
      this.props.message === message
    );
  }

  toJSON(): PatientAlertProps {
    return { ...this.props };
  }
}
