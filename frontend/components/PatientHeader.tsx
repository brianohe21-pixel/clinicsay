'use client'

type Tab = 'datos' | 'citas' | 'alertas'

interface PatientHeaderProps {
  name: string
  dni: string
  age: number
  location: string
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'datos', label: 'Datos' },
  { id: 'citas', label: 'Citas' },
  { id: 'alertas', label: 'Alertas' },
]

export function PatientHeader({ name, dni, age, location, activeTab, onTabChange }: PatientHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-base font-bold text-blue-700">
            {name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{name}</h1>
            <p className="text-sm text-gray-500">
              DNI {dni} · {age} años · {location}
            </p>
          </div>
        </div>
      </div>

      <div className="flex border-t border-gray-100 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
