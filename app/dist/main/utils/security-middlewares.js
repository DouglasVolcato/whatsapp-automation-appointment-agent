"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityMiddlewares = void 0;
const helmet_1 = __importDefault(require("helmet"));
class SecurityMiddlewares {
    apply(app, route) {
        app.use(route.path, (0, helmet_1.default)());
    }
}
exports.SecurityMiddlewares = SecurityMiddlewares;
