import { GetDashboardDataUseCase } from "../../domain/usecases/dashboard/get-dashboard-data-usecase";
import { AuthMiddleware } from "../../domain/middlewares/auth-middleware";
import { ObserverMetricsEnum } from "../utils/metrics-observer";
import { ApiRoute } from "../abstract/api-route";

export const DashboardRoutes: ApiRoute[] = [
  {
    path: "/dashboard/get-data",
    title: "Buscar dados",
    description: "Rota para buscar dados do dashboard",
    method: "GET",
    usecase: () => new GetDashboardDataUseCase.Service(),
    input: GetDashboardDataUseCase.Input,
    output: GetDashboardDataUseCase.Output,
    useAuthentication: true,
    middlewares: [
      () => new AuthMiddleware(),
    ],
    oberverMetrics: [
      ObserverMetricsEnum.request_counter,
    ],
  },
];
