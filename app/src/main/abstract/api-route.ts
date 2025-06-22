import { Middleware } from "../../domain/abstract/classes/middleware";
import { UseCase } from "../../domain/abstract/classes/usecase";
import { ObserverMetricsEnum } from "../utils/metrics-observer";

export type ApiRouteMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiRoute = {
  title: string;
  description: string;
  path: string;
  method: ApiRouteMethod;
  useAuthentication?: boolean;
  usecase?: UseCase;
  middlewares?: Middleware[];
  input?: any;
  output?: any;
  templatePath?: string;
  rateLimiterOptions?: {
    hours: number;
    maxRequests: number;
  }
  oberverMetrics?: ObserverMetricsEnum[]
};
