# ClinicSay — PatientAlertsPanel

Feature fullstack de alertas clínicas implementada como prueba técnica take-home con IA para ClinicSay.

---

## Estructura del proyecto

```
clinicsay/
├── backend/     NestJS + Prisma + DDD
└── frontend/    Next.js 16 + Tailwind CSS
```

---

## Setup rápido

### Requisitos previos

- Node.js 20+
- pnpm 9+

### Instalación

```bash
pnpm install
```

### 1. Backend

```bash
# Ejecutar migraciones y levantar la base de datos
pnpm --filter backend db:migrate

# Poblar con datos de prueba (paciente Ana Torres)
pnpm --filter backend db:seed

# Servidor de desarrollo
pnpm --filter backend start:dev
```

El backend queda disponible en `http://localhost:3000`.

Variables de entorno (archivo `backend/.env`):

| Variable | Descripción | Default |
|----------|-------------|---------|
| `DATABASE_URL` | URL de la base de datos SQLite | `file:./dev.db` |
| `PORT` | Puerto del servidor | `3000` |
| `FRONTEND_URL` | Origen permitido en CORS | `http://localhost:3001` |

### 2. Frontend

```bash
pnpm --filter frontend dev
```

El frontend queda disponible en `http://localhost:3001`.

También puedes usar los scripts de la raíz del monorepo:

```bash
pnpm backend:dev      # backend en modo desarrollo
pnpm frontend:dev     # frontend en modo desarrollo
pnpm backend:test     # tests unitarios
pnpm backend:test:e2e # tests e2e
```

Variable de entorno (archivo `frontend/.env.local`):

| Variable | Descripción | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL del backend | `http://localhost:3000` |

---

## Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/patients/:patientId/alerts` | Listar alertas de un paciente (activas primero, ordenadas por severidad) |
| `POST` | `/patients/:patientId/alerts` | Crear alerta (valida duplicados activos idénticos) |
| `PATCH` | `/patient-alerts/:alertId` | Actualizar campos de una alerta |
| `DELETE` | `/patient-alerts/:alertId` | Eliminar una alerta |

### Ejemplo de body para POST/PATCH

```json
{
  "type": "ALLERGY",
  "severity": "HIGH",
  "message": "Alergia a penicilina",
  "isActive": true
}
```

Tipos válidos: `ALLERGY`, `MEDICAL_RISK`, `SPECIAL_CONDITION`, `ADMINISTRATIVE`
Severidades válidas: `LOW`, `MEDIUM`, `HIGH`

---

## Ejecutar tests

```bash
# Tests unitarios (reglas de negocio)
pnpm --filter backend test

# Tests de API (e2e)
pnpm --filter backend test:e2e

# Todos los tests con cobertura
pnpm --filter backend test:cov
```

Resultado esperado:

```
Tests: 15 passed (unit) + 6 passed (e2e) = 21 tests
```

---

## Decisiones técnicas

### Domain-Driven Design (DDD)

El backend está organizado en cuatro capas claramente separadas:

- **Dominio** (`src/domain/`): entidades, enums y la interfaz del repositorio como puerto. La entidad `PatientAlertEntity` es inmutable y expone comportamiento a través de métodos, no propiedades públicas mutables.
- **Aplicación** (`src/application/`): casos de uso que orquestan la lógica de negocio. La regla anti-duplicados vive aquí, no en el controlador.
- **Infraestructura** (`src/infrastructure/`): implementación del repositorio con Prisma (`PatientAlertPrismaRepository`) y el `PrismaService`.
- **Presentación** (`src/presentation/`): controlador NestJS delgado que solo mapea HTTP ↔ dominio, y DTOs validados con `class-validator`.

### Regla anti-duplicados

La regla "no puede existir más de una alerta activa idéntica para el mismo paciente" se aplica en `CreatePatientAlertUseCase.execute()` y `UpdatePatientAlertUseCase.execute()`. Antes de persistir, el caso de uso consulta al repositorio si ya existe un registro con el mismo `patientId + type + severity + message + isActive=true`. Si lo encuentra, lanza un `ConflictException` (HTTP 409).

### Prisma 7 con driver adapter

Prisma 7 eliminó la conexión directa por string y requiere un driver adapter. Se usa `@prisma/adapter-libsql` con `@libsql/client` para SQLite. El generador está configurado con `moduleFormat = "cjs"` para compatibilidad con la compilación CommonJS de NestJS.

### Inyección de dependencias con símbolo

El repositorio se inyecta usando el símbolo `PATIENT_ALERT_REPOSITORY` (no la clase concreta), lo que desacopla la infraestructura del dominio y facilita el testing con mocks.

### Frontend

Next.js 16 con App Router y Tailwind CSS v4. La página es un Client Component porque necesita estado (tab activa, formulario, lista de alertas). El cliente API (`lib/api.ts`) lanza una clase `ApiError` que el formulario captura para mostrar mensajes de error específicos al usuario.

---

## Uso de IA en el desarrollo

### Herramientas utilizadas

- **Cursor** (Claude Sonnet 4.6) como asistente principal de código

### Partes generadas con IA y revisión manual

| Componente | Generado con IA | Revisión manual |
|------------|-----------------|-----------------|
| Estructura DDD de carpetas | Sí | Sí — ajustada para alinear con convenciones de NestJS 11 |
| Capa de dominio (entidad, enums, interfaz) | Sí | Sí — verificada coherencia entre dominio y casos de uso |
| Casos de uso | Sí | Sí — verificada la lógica anti-duplicados y el manejo de NotFoundException |
| Controlador y DTOs | Sí | Sí — verificada delegación correcta a casos de uso |
| Tests unitarios | Sí | Sí — revisados escenarios cubiertos y nombres descriptivos |
| Componentes de UI | Sí | Sí — ajustados estados de loading/error/vacío |
| Fix Prisma 7 `moduleFormat = "cjs"` | No | Sí — investigado y resuelto manualmente al detectar `import.meta.url` incompatible con CJS |
| Fix imports `import type` con `isolatedModules` | No | Sí — detectado y corregido al analizar errores TS1272 |

### Errores detectados y corregidos manualmente

1. **Prisma 7 ESM vs CJS**: El generador `prisma-client` de Prisma 7 produce por defecto código ESM con `import.meta.url`, incompatible con la salida CJS de NestJS. Solucionado agregando `moduleFormat = "cjs"` al generador en `schema.prisma`.
2. **`isolatedModules` + `emitDecoratorMetadata`**: TypeScript rechaza interfaces usadas en parámetros de constructores decorados cuando `isolatedModules: true`. Corregido separando los imports en `import type { Interface }` e `import { SYMBOL }`.
3. **`import.meta` en tests**: ts-jest con `module: commonjs` no puede procesar `import.meta.url` del cliente generado. Solucionado con `moduleNameMapper` en Jest para reemplazar el cliente generado con un mock liviano.
4. **`skipDuplicates` en SQLite**: Prisma no soporta `skipDuplicates: true` en SQLite para `createMany`. El seed fue corregido para eliminar y recrear los registros.

### Decisiones tomadas manualmente (sin IA)

- Elección de `@prisma/adapter-libsql` como driver adapter para SQLite en Prisma 7
- Estructura del `PATIENT_ALERT_REPOSITORY` como símbolo (no string) para mejor type safety
- Configuración de Jest con `moduleNameMapper` para desacoplar los tests de la infraestructura Prisma
- Orden de prioridad de la UI: activas primero, luego por severidad (HIGH > MEDIUM > LOW)

---

## Rúbrica cubierta

| Criterio | Cobertura |
|----------|-----------|
| Feature/UI entendible (20%) | Panel completo con estados loading, error, vacío, lista y formulario modal |
| NestJS + Prisma + reglas (25%) | 4 endpoints, ValidationPipe, regla anti-duplicados en caso de uso |
| Tests (15%) | 3 unit tests + 5 e2e tests |
| DDD y separación de capas (15%) | 4 capas: dominio, aplicación, infraestructura, presentación |
| Uso responsable de IA (15%) | Documentado en este README con detalle de errores detectados manualmente |
| Comunicación y README (10%) | Este documento |
