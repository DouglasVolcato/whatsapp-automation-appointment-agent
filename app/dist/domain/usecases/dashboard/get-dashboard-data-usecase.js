"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDashboardDataUseCase = void 0;
const dashboards_repository_1 = require("../../../infra/repositories/dashboards-repository");
const usecase_1 = require("../../abstract/classes/usecase");
var GetDashboardDataUseCase;
(function (GetDashboardDataUseCase) {
    GetDashboardDataUseCase.Input = {};
    GetDashboardDataUseCase.Output = {
        totals: {
            user_quantity: 1,
            appointment_quantity: 1,
        },
        createdUsers: [{
                quantity: 1,
                year: 2025,
                month: 6
            }],
        updatedUsers: [{
                quantity: 1,
                year: 2025,
                month: 6
            }],
        createdAppointments: [{
                quantity: 1,
                year: 2025,
                month: 6
            }]
    };
    class Service extends usecase_1.UseCase {
        constructor() {
            super();
            this.dashboardRepository = new dashboards_repository_1.DashboardsRepository();
        }
        setValidators() {
            return [];
        }
        async handle(input) {
            const totals = await this.dashboardRepository.getTotals();
            const createdUsers = await this.dashboardRepository.getCreatedUsersByMonth();
            const updatedUsers = await this.dashboardRepository.getUpdatedUsersByMonth();
            const createdAppointments = await this.dashboardRepository.getCreatedAppointmentsByMonth();
            return {
                totals: totals,
                createdUsers: createdUsers,
                updatedUsers: updatedUsers,
                createdAppointments: createdAppointments
            };
        }
    }
    GetDashboardDataUseCase.Service = Service;
})(GetDashboardDataUseCase || (exports.GetDashboardDataUseCase = GetDashboardDataUseCase = {}));
