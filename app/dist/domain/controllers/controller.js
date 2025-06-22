"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const connection_1 = require("../../infra/database/connection");
const logger_1 = require("../utils/logger");
class Controller {
    constructor(usecase) {
        this.usecase = usecase;
    }
    async execute(input) {
        try {
            await connection_1.DatabaseConnection.startTransaction();
            const result = await this.usecase.execute(input);
            if (result instanceof Error) {
                await connection_1.DatabaseConnection.rollback();
                return {
                    status: 400,
                    body: {
                        error: result.message,
                    },
                };
            }
            await connection_1.DatabaseConnection.commit();
            return {
                status: 200,
                body: result,
            };
        }
        catch (error) {
            await connection_1.DatabaseConnection.rollback();
            logger_1.Logger.error(error);
            return {
                status: 500,
                body: {
                    error: error.message,
                },
            };
        }
    }
}
exports.Controller = Controller;
