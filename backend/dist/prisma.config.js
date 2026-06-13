"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = require("prisma/config");
function resolveDatasourceUrl() {
    const url = process.env["LOCAL_DATABASE_URL"] ?? process.env["DATABASE_URL"];
    if (!url || url.startsWith("libsql://")) {
        return "file:./dev.db";
    }
    return url;
}
exports.default = (0, config_1.defineConfig)({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: resolveDatasourceUrl(),
    },
});
//# sourceMappingURL=prisma.config.js.map