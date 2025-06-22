"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const request_ip_1 = __importDefault(require("request-ip"));
class RateLimiter {
    constructor(input) {
        this.limiter = (0, express_rate_limit_1.default)({
            windowMs: input.hours * 60 * 60 * 1000,
            max: input.maxRequests,
            keyGenerator: (req, res) => {
                return req.clientIp || '';
            }
        });
    }
    applyLimiter(app, route) {
        app.set('trust proxy', true);
        app.use(request_ip_1.default.mw());
        app.use(route.path, this.limiter);
    }
}
exports.RateLimiter = RateLimiter;
