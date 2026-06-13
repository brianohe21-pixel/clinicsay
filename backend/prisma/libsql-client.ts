import { PrismaLibSql } from '@prisma/adapter-libsql'

export function createLibSqlAdapter() {
  const url = process.env.DATABASE_URL ?? 'file:./dev.db'
  const authToken = process.env.DATABASE_AUTH_TOKEN

  return new PrismaLibSql(
    authToken ? { url, authToken } : { url },
  )
}
