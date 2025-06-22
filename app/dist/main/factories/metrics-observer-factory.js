"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMetricsObserver = makeMetricsObserver;
const metrics_observer_1 = require("../utils/metrics-observer");
function makeMetricsObserver(app) {
    return metrics_observer_1.MetricsObserver.getInstance().addApp(app);
}
