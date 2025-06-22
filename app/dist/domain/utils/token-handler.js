"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenHandler {
    constructor() {
        this.secretKey = process.env.SECRET_KEY || "";
    }
    generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.secretKey, {
            expiresIn: "1h"
        });
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, this.secretKey);
    }
}
exports.TokenHandler = TokenHandler;
