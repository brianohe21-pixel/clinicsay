'use client'

import { ApiError } from '@/lib/api'
import type { AlertSeverity, AlertType, CreateAlertPayload, PatientAlert, UpdateAlertPayload } from '@/lib/types'
import { ALERT_SEVERITY_LABELS, ALERT_TYPE_LABELS } from '@/lib/types'
import { useEffect, useState } from 'react'

interface AlertFormProps {
  onClose: () => void
  onSubmit: (payload: CreateAlertPayload | UpdateAlertPayload) => Promise<void>
  initialValues?: PatientAlert
  mode: 'create' | 'edit'
}

const ALERT_TYPES: AlertType[] = ['ALLERGY', 'MEDICAL_RISK', 'SPECIAL_CONDITION', 'ADMINISTRATIVE']
const ALERT_SEVERITIES: AlertSeverity[] = ['HIGH', 'MEDIUM', 'LOW']

export function AlertForm({ onClose, onSubmit, initialValues, mode }: AlertFormProps) {
  const [type, setType] = useState<AlertType>(initialValues?.type ?? 'ALLERGY')
  const [severity, setSeverity] = useState<AlertSeverity>(initialValues?.severity ?? 'MEDIUM')
  const [message, setMessage] = useState(initialValues?.message ?? '')
  const [isActive, setIsActive] = useState(initialValues?.isActive ?? true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) {
      setError('El mensaje no puede estar vacío')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await onSubmit({ type, severity, message: message.trim(), isActive })
      onClose()
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError('Ocurrió un error inesperado')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {mode === 'create' ? 'Nueva alerta clínica' : 'Editar alerta'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Tipo</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as AlertType)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {ALERT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {ALERT_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Severidad</label>
            <div className="flex gap-2">
              {ALERT_SEVERITIES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeverity(s)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    severity === s
                      ? s === 'HIGH'
                        ? 'bg-red-100 text-red-700 ring-2 ring-red-400'
                        : s === 'MEDIUM'
                          ? 'bg-orange-100 text-orange-700 ring-2 ring-orange-400'
                          : 'bg-blue-100 text-blue-700 ring-2 ring-blue-400'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {ALERT_SEVERITY_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Mensaje
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              maxLength={500}
              placeholder="Describe la alerta clínica..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
            />
            <p className="mt-1 text-right text-xs text-gray-400">{message.length}/500</p>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isActive ? 'bg-emerald-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isActive ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-sm font-medium text-gray-700">
              Alerta {isActive ? 'activa' : 'inactiva'}
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Guardando...' : mode === 'create' ? 'Crear alerta' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
