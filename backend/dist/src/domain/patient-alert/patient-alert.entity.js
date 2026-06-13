"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientAlertEntity = void 0;
class PatientAlertEntity {
    props;
    constructor(props) {
        this.props = props;
    }
    static create(props) {
        return new PatientAlertEntity(props);
    }
    get id() {
        return this.props.id;
    }
    get patientId() {
        return this.props.patientId;
    }
    get type() {
        return this.props.type;
    }
    get severity() {
        return this.props.severity;
    }
    get message() {
        return this.props.message;
    }
    get isActive() {
        return this.props.isActive;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    isSameActiveAlert(type, severity, message) {
        return (this.props.isActive &&
            this.props.type === type &&
            this.props.severity === severity &&
            this.props.message === message);
    }
    toJSON() {
        return { ...this.props };
    }
}
exports.PatientAlertEntity = PatientAlertEntity;
//# sourceMappingURL=patient-alert.entity.js.map