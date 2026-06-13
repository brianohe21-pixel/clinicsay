import 'dotenv/config'
import { PrismaClient } from '../generated/prisma/client'
import { createLibSqlAdapter } from './libsql-client'

const prisma = new PrismaClient({ adapter: createLibSqlAdapter() })

async function main() {
  const patient = await prisma.patient.upsert({
    where: { dni: '12345678' },
    update: {},
    create: {
      id: 'mock-patient-ana-torres-001',
      name: 'Ana Torres',
      dni: '12345678',
      age: 34,
      location: 'Sede Miraflores',
    },
  })

  await prisma.patientAlert.deleteMany({ where: { patientId: patient.id } })

  await prisma.patientAlert.createMany({
    data: [
      {
        patientId: patient.id,
        type: 'ALLERGY',
        severity: 'HIGH',
        message: 'Alergia a penicilina',
        isActive: true,
      },
      {
        patientId: patient.id,
        type: 'ADMINISTRATIVE',
        severity: 'MEDIUM',
        message: 'Requiere autorización administrativa',
        isActive: true,
      },
      {
        patientId: patient.id,
        type: 'MEDICAL_RISK',
        severity: 'LOW',
        message: 'Hipertensión arterial leve',
        isActive: false,
      },
    ],
  })

  console.log(`Paciente creado: ${patient.name} (${patient.id})`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
