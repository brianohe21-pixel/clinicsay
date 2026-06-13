"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEVERITY_ORDER = exports.AlertSeverity = void 0;
var AlertSeverity;
(function (AlertSeverity) {
    AlertSeverity["LOW"] = "LOW";
    AlertSeverity["MEDIUM"] = "MEDIUM";
    AlertSeverity["HIGH"] = "HIGH";
})(AlertSeverity || (exports.AlertSeverity = AlertSeverity = {}));
exports.SEVERITY_ORDER = {
    [AlertSeverity.HIGH]: 0,
    [AlertSeverity.MEDIUM]: 1,
    [AlertSeverity.LOW]: 2,
};
//# sourceMappingURL=alert-severity.enum.js.map