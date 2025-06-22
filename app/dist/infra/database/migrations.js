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
exports.DatabaseMigrations = void 0;
const uuid_generator_1 = require("../../domain/utils/uuid-generator");
const logger_1 = require("../../domain/utils/logger");
const connection_1 = require("./connection");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
class DatabaseMigrations {
    constructor() {
        this.folderPath = "db/migrations";
    }
    async runMigrations() {
        await this.ensureMigrationsTable();
        const migrationFiles = fs
            .readdirSync(this.folderPath)
            .filter((file) => file.endsWith(".sql"))
            .sort();
        for (const file of migrationFiles) {
            const filePath = path.join(this.folderPath, file);
            const sql = fs.readFileSync(filePath, "utf8");
            const alreadyRun = await this.hasMigrationRun(file);
            if (alreadyRun) {
                continue;
            }
            try {
                await connection_1.DatabaseConnection.startTransaction();
                await connection_1.DatabaseConnection.query({ sql, params: [] });
                await this.recordMigration(file);
                await connection_1.DatabaseConnection.commit();
                logger_1.Logger.writeLog("logs/db.txt", `Migration successful: ${file}`);
            }
            catch (err) {
                await connection_1.DatabaseConnection.rollback();
                logger_1.Logger.error(new Error(`Migration failed: ${file}`));
                throw err;
            }
        }
    }
    async ensureMigrationsTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS migrations (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        run_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
        await connection_1.DatabaseConnection.query({ sql, params: [] });
    }
    async hasMigrationRun(name) {
        const sql = `SELECT 1 FROM migrations WHERE name = $1`;
        const result = await connection_1.DatabaseConnection.query({ sql, params: [name] });
        if (result.length === 0) {
            return false;
        }
        else {
            return result.length > 0;
        }
    }
    async recordMigration(name) {
        const sql = `INSERT INTO migrations (id, name) VALUES ($1, $2)`;
        await connection_1.DatabaseConnection.query({
            sql,
            params: [uuid_generator_1.UuidGenerator.generate(), name],
        });
    }
}
exports.DatabaseMigrations = DatabaseMigrations;
