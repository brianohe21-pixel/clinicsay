'use client'

import { PatientAlertsPanel } from '@/components/PatientAlertsPanel'
import { PatientHeader } from '@/components/PatientHeader'
import { useState } from 'react'

const MOCK_PATIENT = {
  id: 'mock-patient-ana-torres-001',
  name: 'Ana Torres',
  dni: '12345678',
  age: 34,
  location: 'Sede Miraflores',
}

type Tab = 'datos' | 'citas' | 'alertas'

function DatosTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Nombre completo', value: 'Ana Torres' },
          { label: 'DNI', value: '12345678' },
          { label: 'Edad', value: '34 años' },
          { label: 'Sede', value: 'Miraflores' },
          { label: 'Fecha de nacimiento', value: '15/03/1992' },
          { label: 'Teléfono', value: '+51 987 654 321' },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="mt-0.5 text-sm font-medium text-gray-900">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CitasTab() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-12 text-center">
      <svg className="mb-3 h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="text-sm font-medium text-gray-500">Sin citas programadas</p>
    </div>
  )
}

export default function PatientPage() {
  const [activeTab, setActiveTab] = useState<Tab>('alertas')

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-blue-600" />
          <span className="text-base font-bold text-gray-900">ClinicSay</span>
          <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
            Demo
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl py-6">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <PatientHeader
            name={MOCK_PATIENT.name}
            dni={MOCK_PATIENT.dni}
            age={MOCK_PATIENT.age}
            location={MOCK_PATIENT.location}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="p-6">
            {activeTab === 'datos' && <DatosTab />}
            {activeTab === 'citas' && <CitasTab />}
            {activeTab === 'alertas' && (
              <PatientAlertsPanel patientId={MOCK_PATIENT.id} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
