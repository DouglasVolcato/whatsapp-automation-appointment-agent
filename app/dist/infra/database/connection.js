"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
const logger_1 = require("../../domain/utils/logger");
const env_1 = require("../../main/utils/env");
const pg_1 = require("pg");
class DatabaseConnection {
    static async connect() {
        const databasePool = new pg_1.Pool({
            user: env_1.Env.DB_USER,
            host: env_1.Env.DB_HOST,
            database: env_1.Env.DB_NAME,
            password: env_1.Env.DB_PASSWORD,
            port: Number(env_1.Env.DB_PORT),
        });
        if (!DatabaseConnection.connection) {
            DatabaseConnection.connection = await databasePool.connect();
        }
    }
    static async disconnect() {
        await DatabaseConnection.connection.release();
    }
    static async startTransaction() {
        await DatabaseConnection.connection.query("BEGIN");
    }
    static async commit() {
        await DatabaseConnection.connection.query("COMMIT");
    }
    static async rollback() {
        await DatabaseConnection.connection.query("ROLLBACK");
    }
    static async query(query) {
        logger_1.Logger.dbQuery(query);
        const result = await DatabaseConnection.connection.query(query.sql, query.params);
        logger_1.Logger.dbResponse(result);
        return result.rows;
    }
}
exports.DatabaseConnection = DatabaseConnection;
