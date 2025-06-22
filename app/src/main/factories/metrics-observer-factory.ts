import { MetricsObserver } from "../utils/metrics-observer";

export function makeMetricsObserver(app: any) {
  return MetricsObserver.getInstance().addApp(app);
}
