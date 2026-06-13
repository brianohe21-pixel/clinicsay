"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.8.0",
    "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
    "activeProvider": "sqlite",
    "inlineSchema": "generator client {\n  provider     = \"prisma-client\"\n  output       = \"../generated/prisma\"\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"sqlite\"\n}\n\nmodel Patient {\n  id        String         @id @default(uuid())\n  name      String\n  dni       String         @unique\n  age       Int\n  location  String\n  alerts    PatientAlert[]\n  createdAt DateTime       @default(now())\n  updatedAt DateTime       @updatedAt\n}\n\nmodel PatientAlert {\n  id        String        @id @default(uuid())\n  patientId String\n  type      AlertType\n  severity  AlertSeverity\n  message   String\n  isActive  Boolean       @default(true)\n  patient   Patient       @relation(fields: [patientId], references: [id], onDelete: Cascade)\n  createdAt DateTime      @default(now())\n  updatedAt DateTime      @updatedAt\n}\n\nenum AlertType {\n  ALLERGY\n  MEDICAL_RISK\n  SPECIAL_CONDITION\n  ADMINISTRATIVE\n}\n\nenum AlertSeverity {\n  LOW\n  MEDIUM\n  HIGH\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Patient\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dni\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"age\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"location\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"alerts\",\"kind\":\"object\",\"type\":\"PatientAlert\",\"relationName\":\"PatientToPatientAlert\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"PatientAlert\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"patientId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"AlertType\"},{\"name\":\"severity\",\"kind\":\"enum\",\"type\":\"AlertSeverity\"},{\"name\":\"message\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"patient\",\"kind\":\"object\",\"type\":\"Patient\",\"relationName\":\"PatientToPatientAlert\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"patient\",\"alerts\",\"_count\",\"Patient.findUnique\",\"Patient.findUniqueOrThrow\",\"Patient.findFirst\",\"Patient.findFirstOrThrow\",\"Patient.findMany\",\"data\",\"Patient.createOne\",\"Patient.createMany\",\"Patient.createManyAndReturn\",\"Patient.updateOne\",\"Patient.updateMany\",\"Patient.updateManyAndReturn\",\"create\",\"update\",\"Patient.upsertOne\",\"Patient.deleteOne\",\"Patient.deleteMany\",\"having\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"Patient.groupBy\",\"Patient.aggregate\",\"PatientAlert.findUnique\",\"PatientAlert.findUniqueOrThrow\",\"PatientAlert.findFirst\",\"PatientAlert.findFirstOrThrow\",\"PatientAlert.findMany\",\"PatientAlert.createOne\",\"PatientAlert.createMany\",\"PatientAlert.createManyAndReturn\",\"PatientAlert.updateOne\",\"PatientAlert.updateMany\",\"PatientAlert.updateManyAndReturn\",\"PatientAlert.upsertOne\",\"PatientAlert.deleteOne\",\"PatientAlert.deleteMany\",\"PatientAlert.groupBy\",\"PatientAlert.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"patientId\",\"AlertType\",\"type\",\"AlertSeverity\",\"severity\",\"message\",\"isActive\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"name\",\"dni\",\"age\",\"location\",\"every\",\"some\",\"none\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "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-QAAAAAE_QAAAAAFAQAAAAAFBQAAAAAFCQAA7ACEIOwIAAAABPAIAAAAEPQIAAAAEPgIAAAABPwIAAAABQAIAAAABQQIAAAABQgIAPAAhCDtAAAAAATxAAAAABD1AAAAABD5AAAAAAT9AAAAAAUBAAAAAAUFAAAAAAUJAAD0AIQUFAAA8ACAaAAA_ACAbAAA_ACA7IAAAAAFCIAA-ACECOyAAAAABQiAAPwAhBwUAADwAIBoAAEEAIBsAAEEAIDsAAAA2AjwAAAA2CD0AAAA2CEIAAEA2IgQ7AAAANgI8AAAANgg9AAAANghCAABBNiIHBQAAPAAgGgAAQwAgGwAAQwAgOwAAADQCPAAAADQIPQAAADQIQgAAQjQiBDsAAAA0AjwAAAA0CD0AAAA0CEIAAEM0Ig4FAAA8ACAaAABFACAbAABFACA7AQAAAAE8AQAAAAQ9AQAAAAQ-AQAAAAE_AQAAAAFAAQAAAAFBAQAAAAFCAQBEACFDAQAAAAFEAQAAAAFFAQAAAAELOwEAAAABPAEAAAAEPQEAAAAEPgEAAAABPwEAAAABQAEAAAABQQEAAAABQgEARQAhQwEAAAABRAEAAAABRQEAAAABCi4AAEYAMC8AABwAEDAAAEYAMDEBADYAITlAADoAITpAADoAIUYBADYAIUcBADYAIUgCAEcAIUkBADYAIQ0FAAA8ACAYAABJACAZAAA8ACAaAAA8ACAbAAA8ACA7AgAAAAE8AgAAAAQ9AgAAAAQ-AgAAAAE_AgAAAAFAAgAAAAFBAgAAAAFCAgBIACENBQAAPAAgGAAASQAgGQAAPAAgGgAAPAAgGwAAPAAgOwIAAAABPAIAAAAEPQIAAAAEPgIAAAABPwIAAAABQAIAAAABQQIAAAABQgIASAAhCDsIAAAAATwIAAAABD0IAAAABD4IAAAAAT8IAAAAAUAIAAAAAUEIAAAAAUIIAEkAIQsEAABOACAuAABKADAvAAAJABAwAABKADAxAQBLACE5QABNACE6QABNACFGAQBLACFHAQBLACFIAgBMACFJAQBLACELOwEAAAABPAEAAAAEPQEAAAAEPgEAAAABPwEAAAABQAEAAAABQQEAAAABQgEARQAhQwEAAAABRAEAAAABRQEAAAABCDsCAAAAATwCAAAABD0CAAAABD4CAAAAAT8CAAAAAUACAAAAAUECAAAAAUICADwAIQg7QAAAAAE8QAAAAAQ9QAAAAAQ-QAAAAAE_QAAAAAFAQAAAAAFBQAAAAAFCQAA9ACEDSgAAAwAgSwAAAwAgTAAAAwAgDAMAAFMAIC4AAE8AMC8AAAMAEDAAAE8AMDEBAEsAITIBAEsAITQAAFA0IjYAAFE2IjcBAEsAITggAFIAITlAAE0AITpAAE0AIQQ7AAAANAI8AAAANAg9AAAANAhCAABDNCIEOwAAADYCPAAAADYIPQAAADYIQgAAQTYiAjsgAAAAAUIgAD8AIQ0EAABOACAuAABKADAvAAAJABAwAABKADAxAQBLACE5QABNACE6QABNACFGAQBLACFHAQBLACFIAgBMACFJAQBLACFNAAAJACBOAAAJACAAAAABUgEAAAABAVIAAAA0AgFSAAAANgIBUiAAAAABAVJAAAAAAQUSAAB1ACATAAB4ACBPAAB2ACBQAAB3ACBVAAABACADEgAAdQAgTwAAdgAgVQAAAQAgAAAAAAAFUgIAAAABWAIAAAABWQIAAAABWgIAAAABWwIAAAABCxIAAGUAMBMAAGoAME8AAGYAMFAAAGcAMFEAAGgAIFIAAGkAMFMAAGkAMFQAAGkAMFUAAGkAMFYAAGsAMFcAAGwAMAcxAQAAAAE0AAAANAI2AAAANgI3AQAAAAE4IAAAAAE5QAAAAAE6QAAAAAECAAAABQAgEgAAcAAgAwAAAAUAIBIAAHAAIBMAAG8AIAELAAB0ADAMAwAAUwAgLgAATwAwLwAAAwAQMAAATwAwMQEAAAABMgEASwAhNAAAUDQiNgAAUTYiNwEASwAhOCAAUgAhOUAATQAhOkAATQAhAgAAAAUAIAsAAG8AIAIAAABtACALAABuACALLgAAbAAwLwAAbQAQMAAAbAAwMQEASwAhMgEASwAhNAAAUDQiNgAAUTYiNwEASwAhOCAAUgAhOUAATQAhOkAATQAhCy4AAGwAMC8AAG0AEDAAAGwAMDEBAEsAITIBAEsAITQAAFA0IjYAAFE2IjcBAEsAITggAFIAITlAAE0AITpAAE0AIQcxAQBXACE0AABYNCI2AABZNiI3AQBXACE4IABaACE5QABbACE6QABbACEHMQEAVwAhNAAAWDQiNgAAWTYiNwEAVwAhOCAAWgAhOUAAWwAhOkAAWwAhBzEBAAAAATQAAAA0AjYAAAA2AjcBAAAAATggAAAAATlAAAAAATpAAAAAAQQSAABlADBPAABmADBRAABoACBVAABpADAAAQQAAHIAIAcxAQAAAAE0AAAANAI2AAAANgI3AQAAAAE4IAAAAAE5QAAAAAE6QAAAAAEHMQEAAAABOUAAAAABOkAAAAABRgEAAAABRwEAAAABSAIAAAABSQEAAAABAgAAAAEAIBIAAHUAIAMAAAAJACASAAB1ACATAAB5ACAJAAAACQAgCwAAeQAgMQEAVwAhOUAAWwAhOkAAWwAhRgEAVwAhRwEAVwAhSAIAYwAhSQEAVwAhBzEBAFcAITlAAFsAITpAAFsAIUYBAFcAIUcBAFcAIUgCAGMAIUkBAFcAIQIEBgIFAAMBAwABAQQHAAAAAAUFAAgYAAkZAAoaAAsbAAwAAAAAAAUFAAgYAAkZAAoaAAsbAAwBAwABAQMAAQMFABEaABIbABMAAAADBQARGgASGwATBgIBBwgBCAsBCQwBCg0BDA8BDREEDhIFDxQBEBYEERcGFBgBFRkBFhoEHB0HHR4NHh8CHyACICECISICIiMCIyUCJCcEJSgOJioCJywEKC0PKS4CKi8CKzAELDMQLTQU"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.sqlite.js"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.sqlite.wasm-base64.js");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map