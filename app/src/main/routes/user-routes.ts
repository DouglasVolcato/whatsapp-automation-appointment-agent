import { ManageUsersUseCase } from "../../domain/usecases/users/manage-users-usecase";
import { AuthMiddleware } from "../../domain/middlewares/auth-middleware";
import { ObserverMetricsEnum } from "../utils/metrics-observer";
import { ApiRoute } from "../abstract/api-route";

export const UserRoutes: ApiRoute[] = [
  {
    path: "/user/create",
    title: "Cria um usuário",
    description: "Rota para criar um usuário",
    method: "POST",
    usecase: () => new ManageUsersUseCase.CreateService(),
    input: ManageUsersUseCase.CreateInput,
    output: ManageUsersUseCase.CreateOutput,
    useAuthentication: true,
    middlewares: [() => new AuthMiddleware()],
    oberverMetrics: [
      ObserverMetricsEnum.request_counter
    ],
  },
  {
    path: "/user/update",
    title: "Atualiza um usuário",
    description: "Rota para atualizar um usuário",
    method: "PATCH",
    usecase: () => new ManageUsersUseCase.UpdateService(),
    input: ManageUsersUseCase.UpdateInput,
    output: ManageUsersUseCase.UpdateOutput,
    useAuthentication: true,
    middlewares: [() => new AuthMiddleware()],
    oberverMetrics: [
      ObserverMetricsEnum.request_counter
    ],
  },
  {
    path: "/user/delete",
    title: "Remove um usuário",
    description: "Rota para remover um usuário",
    method: "DELETE",
    usecase: () => new ManageUsersUseCase.DeleteService(),
    input: ManageUsersUseCase.DeleteInput,
    output: ManageUsersUseCase.DeleteOutput,
    useAuthentication: true,
    middlewares: [() => new AuthMiddleware()],
    oberverMetrics: [
      ObserverMetricsEnum.request_counter
    ],
  },
  {
    path: "/user/get-one",
    title: "Busca um usuário",
    description: "Rota para buscar um usuário",
    method: "GET",
    usecase: () => new ManageUsersUseCase.GetOneService(),
    input: ManageUsersUseCase.GetOneInput,
    output: ManageUsersUseCase.GetOneOutput,
    useAuthentication: true,
    middlewares: [() => new AuthMiddleware()],
    oberverMetrics: [
      ObserverMetricsEnum.request_counter
    ],
  },
  {
    path: "/user/get-many",
    title: "Lista os usuários",
    description: "Rota para listar os usuários",
    method: "GET",
    usecase: () => new ManageUsersUseCase.GetManyService(),
    input: ManageUsersUseCase.GetManyInput,
    output: ManageUsersUseCase.GetManyOutput,
    useAuthentication: true,
    middlewares: [() => new AuthMiddleware()],
    oberverMetrics: [
      ObserverMetricsEnum.request_counter
    ],
  },
];
