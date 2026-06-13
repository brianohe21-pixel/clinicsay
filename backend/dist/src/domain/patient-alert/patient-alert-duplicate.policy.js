"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeAlertMessage = normalizeAlertMessage;
exports.buildAlertIdentity = buildAlertIdentity;
exports.isSameActiveAlertIdentity = isSameActiveAlertIdentity;
exports.findConflictingActiveAlert = findConflictingActiveAlert;
function normalizeAlertMessage(message) {
    return message.trim();
}
function buildAlertIdentity(type, severity, message) {
    return {
        type,
        severity,
        message: normalizeAlertMessage(message),
    };
}
function isSameActiveAlertIdentity(alert, identity) {
    return (alert.isActive &&
        alert.isSameActiveAlert(identity.type, identity.severity, identity.message));
}
function findConflictingActiveAlert(alerts, identity, excludeAlertId) {
    return alerts.find((alert) => alert.id !== excludeAlertId && isSameActiveAlertIdentity(alert, identity));
}
//# sourceMappingURL=patient-alert-duplicate.policy.js.map