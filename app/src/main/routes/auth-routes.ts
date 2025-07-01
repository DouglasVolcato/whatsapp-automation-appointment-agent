import { ObserverMetricsEnum } from "../utils/metrics-observer";
import { MakeLoginUseCase } from "../../domain/usecases/auth/make-login-usecase";
import { ApiRoute } from "../abstract/api-route";

export const AuthRoutes: ApiRoute[] = [
  {
    path: "/auth/login",
    title: "Login",
    description: "Rota para realizar login e obter token de acesso",
    method: "POST",
    usecase: () => new MakeLoginUseCase.Service(),
    input: MakeLoginUseCase.Input,
    output: MakeLoginUseCase.Output,
    oberverMetrics: [
      ObserverMetricsEnum.request_counter,
    ],
    rateLimiterOptions: {
      hours: 1,
      maxRequests: 10,
    }
  },
];
