"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRoutes = void 0;
const get_dashboard_data_usecase_1 = require("../../domain/usecases/dashboard/get-dashboard-data-usecase");
const auth_middleware_1 = require("../../domain/middlewares/auth-middleware");
const metrics_observer_1 = require("../utils/metrics-observer");
exports.DashboardRoutes = [
    {
        path: "/dashboard/get-data",
        title: "Buscar dados",
        description: "Rota para buscar dados do dashboard",
        method: "GET",
        usecase: new get_dashboard_data_usecase_1.GetDashboardDataUseCase.Service(),
        input: get_dashboard_data_usecase_1.GetDashboardDataUseCase.Input,
        output: get_dashboard_data_usecase_1.GetDashboardDataUseCase.Output,
        useAuthentication: true,
        middlewares: [
            new auth_middleware_1.AuthMiddleware(),
        ],
        oberverMetrics: [
            metrics_observer_1.ObserverMetricsEnum.request_counter,
        ],
    },
];
