"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hasher = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class Hasher {
    constructor() {
        this.saltRounds = 15;
    }
    async hash(content) {
        return await bcryptjs_1.default.hash(content, this.saltRounds);
    }
    async compareHash(input) {
        return await bcryptjs_1.default.compare(input.content, input.hash);
    }
}
exports.Hasher = Hasher;
