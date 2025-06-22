"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const middleware_1 = require("../abstract/classes/middleware");
class AuthMiddleware extends middleware_1.Middleware {
    async execute(input) {
        return input;
    }
}
exports.AuthMiddleware = AuthMiddleware;
