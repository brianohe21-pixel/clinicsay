'use client'

import { alertsApi } from '@/lib/api'
import type { CreateAlertPayload, PatientAlert, UpdateAlertPayload } from '@/lib/types'
import { useEffect, useState } from 'react'
import { AlertCard } from './AlertCard'
import { AlertForm } from './AlertForm'

interface PatientAlertsPanelProps {
  patientId: string
}

function SkeletonCard() {
  return (
    <div className="flex animate-pulse items-center gap-3 rounded-lg border border-gray-200 p-4">
      <div className="h-5 w-10 rounded bg-gray-200" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-16 rounded bg-gray-200" />
        <div className="h-4 w-48 rounded bg-gray-200" />
      </div>
      <div className="h-7 w-20 rounded bg-gray-200" />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-12 text-center">
      <svg className="mb-3 h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p className="text-sm font-medium text-gray-500">Sin alertas registradas</p>
      <p className="mt-1 text-xs text-gray-400">Crea la primera alerta para este paciente</p>
    </div>
  )
}

export function PatientAlertsPanel({ patientId }: PatientAlertsPanelProps) {
  const [alerts, setAlerts] = useState<PatientAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingAlert, setEditingAlert] = useState<PatientAlert | null>(null)

  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadAlerts() {
      setLoading(true)
      setFetchError(null)
      try {
        const data = await alertsApi.getByPatient(patientId)
        if (!cancelled) setAlerts(data)
      } catch {
        if (!cancelled) {
          setFetchError('No se pudieron cargar las alertas. Verifica que el backend esté corriendo.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadAlerts()

    return () => {
      cancelled = true
    }
  }, [patientId, retryCount])

  const handleCreate = async (payload: CreateAlertPayload | UpdateAlertPayload) => {
    const newAlert = await alertsApi.create(patientId, payload as CreateAlertPayload)
    setAlerts((prev) => [newAlert, ...prev])
  }

  const handleUpdate = async (payload: CreateAlertPayload | UpdateAlertPayload) => {
    if (!editingAlert) return
    const updated = await alertsApi.update(editingAlert.id, payload as UpdateAlertPayload)
    setAlerts((prev) => prev.map((a) => (a.id === updated.id ? updated : a)))
  }

  const handleToggleActive = async (alert: PatientAlert) => {
    const updated = await alertsApi.update(alert.id, { isActive: !alert.isActive })
    setAlerts((prev) => prev.map((a) => (a.id === updated.id ? updated : a)))
  }

  const handleDelete = async (alert: PatientAlert) => {
    await alertsApi.delete(alert.id)
    setAlerts((prev) => prev.filter((a) => a.id !== alert.id))
  }

  const openEdit = (alert: PatientAlert) => {
    setEditingAlert(alert)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingAlert(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Alertas clínicas</h3>
        <button
          onClick={() => { setEditingAlert(null); setShowForm(true) }}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva alerta
        </button>
      </div>

      {fetchError && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200">
          <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{fetchError}</span>
          <button onClick={() => setRetryCount((c) => c + 1)} className="ml-auto text-red-600 underline hover:no-underline">
            Reintentar
          </button>
        </div>
      )}

      <div className="space-y-2">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : alerts.length === 0 && !fetchError ? (
          <EmptyState />
        ) : (
          alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onEdit={openEdit}
              onToggleActive={handleToggleActive}
            />
          ))
        )}
      </div>

      {showForm && (
        <AlertForm
          mode={editingAlert ? 'edit' : 'create'}
          initialValues={editingAlert ?? undefined}
          onClose={closeForm}
          onSubmit={editingAlert ? handleUpdate : handleCreate}
        />
      )}
    </div>
  )
}
