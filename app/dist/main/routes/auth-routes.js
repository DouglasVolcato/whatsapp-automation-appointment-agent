"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const metrics_observer_1 = require("../utils/metrics-observer");
const make_login_usecase_1 = require("../../domain/usecases/auth/make-login-usecase");
exports.AuthRoutes = [
    {
        path: "/auth/login",
        title: "Login",
        description: "Rota para realizar login e obter token de acesso",
        method: "POST",
        usecase: new make_login_usecase_1.MakeLoginUseCase.Service(),
        input: make_login_usecase_1.MakeLoginUseCase.Input,
        output: make_login_usecase_1.MakeLoginUseCase.Output,
        oberverMetrics: [
            metrics_observer_1.ObserverMetricsEnum.request_counter,
        ],
        rateLimiterOptions: {
            hours: 1,
            maxRequests: 10,
        }
    },
];
