import { HttpResponse } from "../../domain/abstract/http/http-response";
import { HttpRequest } from "../../domain/abstract/http/http-request";
import { makeController } from "../factories/controller-factory";
import { SecurityMiddlewares } from "./security-middlewares";
import { MetricsObserver } from "./metrics-observer";
import { Logger } from "../../domain/utils/logger";
import { ApiRoute } from "../abstract/api-route";
import { RateLimiter } from "./rate-limiter";
import { Request, Response } from "express";
import { Env } from "./env";

export class ExpressRoute {
  private route: ApiRoute;

  public constructor(app: any, route: ApiRoute) {
    this.route = route;

    if (route.rateLimiterOptions) {
      new RateLimiter({
        hours: route.rateLimiterOptions.hours,
        maxRequests: route.rateLimiterOptions.maxRequests,
      }).applyLimiter(app, route);
    }

    app[route.method.toLowerCase()](route.path, this.execute.bind(this));

    if (!route.templatePath) {
      new SecurityMiddlewares().apply(app, this.route);
    }
  }

  public async execute(req: Request, res: Response) {
    try {
      let input: HttpRequest = {
        ...req.params,
        ...req.query,
        ...req.body,
        ...req.headers,
      };
      Logger.apiRequest({ path: this.route.path, data: input });

      if (this.route.middlewares) {
        for (const middleware of this.route.middlewares) {
          input = await (middleware()).execute(input);
          if (input instanceof Error) {
            Logger.apiResponse({
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

      let response: HttpResponse = {
        status: 200,
        body: {},
      }

      if (this.route.usecase) {
        const controller = makeController((this.route.usecase()));
        response = await controller.execute(input);

        Logger.apiResponse({
          response,
          method: this.route.method,
          status: response.status,
        });
      }

      if (this.route.oberverMetrics) {
        MetricsObserver.getInstance().observe({
          metrics: this.route.oberverMetrics,
          route: this.route,
          request: input,
          response: response,
        })
      }

      if (this.route.templatePath && response.status === 200) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.render(`${Env.VIEWS_PATH}/${this.route.templatePath}`, {
          title: this.route.title,
          data: response.body,
        });
      } else {
        return res.status(response.status).json(response.body);
      }
    } catch (error: any) {
      Logger.error(error);
      Logger.apiResponse({
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
