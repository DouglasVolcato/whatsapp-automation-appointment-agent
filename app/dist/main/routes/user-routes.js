"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const manage_users_usecase_1 = require("../../domain/usecases/users/manage-users-usecase");
const auth_middleware_1 = require("../../domain/middlewares/auth-middleware");
const metrics_observer_1 = require("../utils/metrics-observer");
exports.UserRoutes = [
    {
        path: "/user/create",
        title: "Cria um usuário",
        description: "Rota para criar um usuário",
        method: "POST",
        usecase: new manage_users_usecase_1.ManageUsersUseCase.CreateService(),
        input: manage_users_usecase_1.ManageUsersUseCase.CreateInput,
        output: manage_users_usecase_1.ManageUsersUseCase.CreateOutput,
        useAuthentication: true,
        middlewares: [new auth_middleware_1.AuthMiddleware()],
        oberverMetrics: [
            metrics_observer_1.ObserverMetricsEnum.request_counter
        ],
    },
    {
        path: "/user/update",
        title: "Atualiza um usuário",
        description: "Rota para atualizar um usuário",
        method: "PATCH",
        usecase: new manage_users_usecase_1.ManageUsersUseCase.UpdateService(),
        input: manage_users_usecase_1.ManageUsersUseCase.UpdateInput,
        output: manage_users_usecase_1.ManageUsersUseCase.UpdateOutput,
        useAuthentication: true,
        middlewares: [new auth_middleware_1.AuthMiddleware()],
        oberverMetrics: [
            metrics_observer_1.ObserverMetricsEnum.request_counter
        ],
    },
    {
        path: "/user/delete",
        title: "Remove um usuário",
        description: "Rota para remover um usuário",
        method: "DELETE",
        usecase: new manage_users_usecase_1.ManageUsersUseCase.DeleteService(),
        input: manage_users_usecase_1.ManageUsersUseCase.DeleteInput,
        output: manage_users_usecase_1.ManageUsersUseCase.DeleteOutput,
        useAuthentication: true,
        middlewares: [new auth_middleware_1.AuthMiddleware()],
        oberverMetrics: [
            metrics_observer_1.ObserverMetricsEnum.request_counter
        ],
    },
    {
        path: "/user/get-one",
        title: "Busca um usuário",
        description: "Rota para buscar um usuário",
        method: "GET",
        usecase: new manage_users_usecase_1.ManageUsersUseCase.GetOneService(),
        input: manage_users_usecase_1.ManageUsersUseCase.GetOneInput,
        output: manage_users_usecase_1.ManageUsersUseCase.GetOneOutput,
        useAuthentication: true,
        middlewares: [new auth_middleware_1.AuthMiddleware()],
        oberverMetrics: [
            metrics_observer_1.ObserverMetricsEnum.request_counter
        ],
    },
    {
        path: "/user/get-many",
        title: "Lista os usuários",
        description: "Rota para listar os usuários",
        method: "GET",
        usecase: new manage_users_usecase_1.ManageUsersUseCase.GetManyService(),
        input: manage_users_usecase_1.ManageUsersUseCase.GetManyInput,
        output: manage_users_usecase_1.ManageUsersUseCase.GetManyOutput,
        useAuthentication: true,
        middlewares: [new auth_middleware_1.AuthMiddleware()],
        oberverMetrics: [
            metrics_observer_1.ObserverMetricsEnum.request_counter
        ],
    },
];
