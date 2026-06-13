'use client'

import type { PatientAlert } from '@/lib/types'
import { ALERT_TYPE_SHORT } from '@/lib/types'
import { SeverityBadge } from './SeverityBadge'

interface AlertCardProps {
  alert: PatientAlert
  onEdit: (alert: PatientAlert) => void
  onToggleActive: (alert: PatientAlert) => void
}

export function AlertCard({ alert, onEdit, onToggleActive }: AlertCardProps) {
  return (
    <div
      className={`flex items-start gap-3 rounded-lg border p-4 transition-colors ${
        alert.isActive
          ? 'border-gray-200 bg-white hover:bg-gray-50'
          : 'border-gray-100 bg-gray-50 opacity-60'
      }`}
    >
      <div className="mt-0.5 flex-shrink-0">
        <SeverityBadge severity={alert.severity} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {ALERT_TYPE_SHORT[alert.type]}
          </span>
          {!alert.isActive && (
            <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-500">
              Inactiva
            </span>
          )}
        </div>
        <p className="mt-0.5 text-sm text-gray-800">{alert.message}</p>
      </div>

      <div className="flex flex-shrink-0 items-center gap-2">
        <span
          className={`text-xs font-medium ${alert.isActive ? 'text-emerald-600' : 'text-gray-400'}`}
        >
          {alert.isActive ? 'Activa' : 'Inactiva'}
        </span>
        <button
          onClick={() => onToggleActive(alert)}
          className="rounded px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-300 transition hover:bg-gray-100 hover:text-gray-800"
        >
          {alert.isActive ? 'Desactivar' : 'Activar'}
        </button>
        <button
          onClick={() => onEdit(alert)}
          className="rounded bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200 transition hover:bg-blue-100"
        >
          Editar
        </button>
      </div>
    </div>
  )
}
