"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsObserver = exports.ObserverMetricsEnum = void 0;
const promClient = __importStar(require("prom-client"));
var ObserverMetricsEnum;
(function (ObserverMetricsEnum) {
    ObserverMetricsEnum[ObserverMetricsEnum["request_counter"] = 0] = "request_counter";
    ObserverMetricsEnum[ObserverMetricsEnum["llm_requests_total"] = 1] = "llm_requests_total";
    ObserverMetricsEnum[ObserverMetricsEnum["webpage_views_total"] = 2] = "webpage_views_total";
})(ObserverMetricsEnum || (exports.ObserverMetricsEnum = ObserverMetricsEnum = {}));
class MetricsObserver {
    constructor() {
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
    static getInstance() {
        if (!MetricsObserver.instance) {
            MetricsObserver.instance = new MetricsObserver();
        }
        return MetricsObserver.instance;
    }
    addApp(app) {
        app.get("/metrics", async (req, res) => {
            res.set("Content-Type", promClient.register.contentType);
            res.end(await promClient.register.metrics());
        });
    }
    observe(input) {
        for (const metric of input.metrics) {
            switch (metric) {
                case ObserverMetricsEnum.request_counter:
                    MetricsObserver.requestCounter.inc({
                        method: input.route.method,
                        status_code: input.response.status
                    });
                    break;
                case ObserverMetricsEnum.llm_requests_total:
                    MetricsObserver.llmCounter.inc({
                        method: input.route.method,
                        status_code: input.response.status
                    });
                    break;
                case ObserverMetricsEnum.webpage_views_total:
                    MetricsObserver.webpageCounter.inc({
                        method: input.route.method
                    });
                    break;
            }
        }
    }
}
exports.MetricsObserver = MetricsObserver;
