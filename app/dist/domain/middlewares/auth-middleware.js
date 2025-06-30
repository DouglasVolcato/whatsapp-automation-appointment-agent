"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const validate_login_usecase_1 = require("../usecases/auth/validate-login-usecase");
const middleware_1 = require("../abstract/classes/middleware");
class AuthMiddleware extends middleware_1.Middleware {
    constructor() {
        super();
        this.validateLoginUseCase = new validate_login_usecase_1.ValidateLoginUseCase.Service();
    }
    async execute(input) {
        try {
            if (!('token' in input)) {
                return new Error('Acesso inválido');
            }
            const result = await this.validateLoginUseCase.execute({ token: input.token });
            if (result instanceof Error || !result.valid) {
                return new Error('Acesso inválido');
            }
            input.accessId = result.accessId;
            return input;
        }
        catch (error) {
            return new Error('Acesso inválido');
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
