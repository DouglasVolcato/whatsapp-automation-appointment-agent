import { HttpResponse } from "../../domain/abstract/http/http-response";
import { HttpRequest } from "../../domain/abstract/http/http-request";
import { ApiRoute } from "../abstract/api-route";
import * as promClient from "prom-client";

export enum ObserverMetricsEnum {
  'request_counter',
  'llm_requests_total',
  'webpage_views_total',
}

export class MetricsObserver {
  private static instance: MetricsObserver;
  private static requestCounter: promClient.Counter<"method" | "status_code">;
  private static llmCounter: promClient.Counter<"method" | "status_code">;
  private static webpageCounter: promClient.Counter<"method">;

  private constructor() {
    const collectDefaultMetrics = promClient.collectDefaultMetrics;
    collectDefaultMetrics();

    MetricsObserver.requestCounter = new promClient.Counter({
      name: "http_requests_total",
      help: "Total number of HTTP requests",
      labelNames: ["method", "status_code"],
    });

    MetricsObserver.llmCounter = new promClient.Counter({
      name: "llm_requests_total",
      help: "Total number of LLM requests",
      labelNames: ["method", "status_code"],
    });

    MetricsObserver.webpageCounter = new promClient.Counter({
      name: "webpage_views_total",
      help: "Total number of webpage views",
      labelNames: ["method"],
    });
  }

  public static getInstance(): MetricsObserver {
    if (!MetricsObserver.instance) {
      MetricsObserver.instance = new MetricsObserver();
    }

    return MetricsObserver.instance;
  }

  public addApp(app: any) {
    app.get("/metrics", async (req: any, res: any) => {
      res.set("Content-Type", promClient.register.contentType);
      res.end(await promClient.register.metrics());
    });
  }

  public observe(
    input: {
      metrics: ObserverMetricsEnum[],
      route: ApiRoute,
      request: HttpRequest,
      response: HttpResponse
    }): void {
    for (const metric of input.metrics) {
      switch (metric) {
        case ObserverMetricsEnum.request_counter:
          MetricsObserver.requestCounter.inc(
            {
              method: input.route.method,
              status_code: input.response.status
            }
          );
          break;
        case ObserverMetricsEnum.llm_requests_total:
          MetricsObserver.llmCounter.inc(
            {
              method: input.route.method,
              status_code: input.response.status
            }
          );
          break;
        case ObserverMetricsEnum.webpage_views_total:
          MetricsObserver.webpageCounter.inc(
            {
              method: input.route.method
            }
          );
          break
      }
    }
  }
}
