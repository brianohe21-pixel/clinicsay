export enum AlertSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export const SEVERITY_ORDER: Record<AlertSeverity, number> = {
  [AlertSeverity.HIGH]: 0,
  [AlertSeverity.MEDIUM]: 1,
  [AlertSeverity.LOW]: 2,
};
