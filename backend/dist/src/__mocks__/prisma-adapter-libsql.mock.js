"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaLibSql = void 0;
exports.PrismaLibSql = jest.fn().mockImplementation(() => ({
    connect: jest.fn(),
    connectToShadowDb: jest.fn(),
}));
//# sourceMappingURL=prisma-adapter-libsql.mock.js.map