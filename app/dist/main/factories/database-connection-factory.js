"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDatabaseConnection = makeDatabaseConnection;
const connection_1 = require("../../infra/database/connection");
const migrations_1 = require("../../infra/database/migrations");
const logger_1 = require("../../domain/utils/logger");
async function makeDatabaseConnection() {
    try {
        await connection_1.DatabaseConnection.connect();
        logger_1.Logger.writeLog("logs/db.txt", "Database connected");
        await new migrations_1.DatabaseMigrations().runMigrations();
        logger_1.Logger.writeLog("logs/db.txt", "Database migrations run");
    }
    catch (err) {
        logger_1.Logger.error(new Error(`Database connection failed`));
    }
}
