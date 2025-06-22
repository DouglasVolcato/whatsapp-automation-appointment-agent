"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressRoute = void 0;
const controller_factory_1 = require("../factories/controller-factory");
const security_middlewares_1 = require("./security-middlewares");
const metrics_observer_1 = require("./metrics-observer");
const logger_1 = require("../../domain/utils/logger");
const rate_limiter_1 = require("./rate-limiter");
const env_1 = require("./env");
class ExpressRoute {
    constructor(app, route) {
        this.route = route;
        if (route.rateLimiterOptions) {
            new rate_limiter_1.RateLimiter({
                hours: route.rateLimiterOptions.hours,
                maxRequests: route.rateLimiterOptions.maxRequests,
            }).applyLimiter(app, route);
        }
        app[route.method.toLowerCase()](route.path, this.execute.bind(this));
        if (!route.templatePath) {
            new security_middlewares_1.SecurityMiddlewares().apply(app, this.route);
        }
    }
    async execute(req, res) {
        try {
            let input = {
                ...req.params,
                ...req.query,
                ...req.body,
                ...req.headers,
            };
            logger_1.Logger.apiRequest({ path: this.route.path, data: input });
            if (this.route.middlewares) {
                for (const middleware of this.route.middlewares) {
                    input = await middleware.execute(input);
                    if (input instanceof Error) {
                        logger_1.Logger.apiResponse({
                            response: {
                                status: 401,
                                error: input.message,
                            },
                            method: this.route.method,
                            status: 401,
                        });
                        return res.status(401).json({
                            error: input.message,
                        });
                    }
                }
            }
            let response = {
                status: 200,
                body: {},
            };
            if (this.route.usecase) {
                const controller = (0, controller_factory_1.makeController)(this.route.usecase);
                response = await controller.execute(input);
                logger_1.Logger.apiResponse({
                    response,
                    method: this.route.method,
                    status: response.status,
                });
            }
            if (this.route.oberverMetrics) {
                metrics_observer_1.MetricsObserver.getInstance().observe({
                    metrics: this.route.oberverMetrics,
                    route: this.route,
                    request: input,
                    response: response,
                });
            }
            if (this.route.templatePath && response.status === 200) {
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.render(`${env_1.Env.VIEWS_PATH}/${this.route.templatePath}`, {
                    title: this.route.title,
                    data: response.body,
                });
            }
            else {
                return res.status(response.status).json(response.body);
            }
        }
        catch (error) {
            logger_1.Logger.error(error);
            logger_1.Logger.apiResponse({
                response: {
                    error: error.message,
                },
                method: this.route.method,
                status: 500,
            });
            return res.status(500).json({
                error: error.message,
            });
        }
    }
}
exports.ExpressRoute = ExpressRoute;
