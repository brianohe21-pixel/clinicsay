'use client'

import type { AlertSeverity } from '@/lib/types'

const config: Record<AlertSeverity, { label: string; classes: string }> = {
  HIGH: { label: 'HIGH', classes: 'bg-red-100 text-red-700 border border-red-200' },
  MEDIUM: { label: 'MED', classes: 'bg-orange-100 text-orange-700 border border-orange-200' },
  LOW: { label: 'LOW', classes: 'bg-blue-100 text-blue-600 border border-blue-200' },
}

export function SeverityBadge({ severity }: { severity: AlertSeverity }) {
  const { label, classes } = config[severity]
  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${classes}`}>
      {label}
    </span>
  )
}
