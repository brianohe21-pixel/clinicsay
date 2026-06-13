"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLibSqlAdapter = createLibSqlAdapter;
const adapter_libsql_1 = require("@prisma/adapter-libsql");
function createLibSqlAdapter() {
    const url = process.env.DATABASE_URL ?? 'file:./dev.db';
    const authToken = process.env.DATABASE_AUTH_TOKEN;
    return new adapter_libsql_1.PrismaLibSql(authToken ? { url, authToken } : { url });
}
//# sourceMappingURL=libsql-client.js.map