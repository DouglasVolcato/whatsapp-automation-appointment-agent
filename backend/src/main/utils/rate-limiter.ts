import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { ApiRoute } from '../abstract/api-route';
import requestIp from "request-ip";

export class RateLimiter {
    private readonly limiter: RateLimitRequestHandler

    public constructor(input: { hours: number, maxRequests: number }) {
        this.limiter = rateLimit({
            windowMs: input.hours * 60 * 60 * 1000,
            max: input.maxRequests,
            keyGenerator: (req, res) => {
                return req.clientIp || ''
            }
        });
    }

    public applyLimiter(app: any, route: ApiRoute) {
        app.set('trust proxy', true);
        app.use(requestIp.mw());
        app.use(route.path, this.limiter);
    }
}