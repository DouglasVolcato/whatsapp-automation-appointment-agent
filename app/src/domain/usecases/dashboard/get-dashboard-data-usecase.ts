import { DashboardsRepository } from "../../../infra/repositories/dashboards-repository";
import { ValidatorInterface } from "../../abstract/interfaces/validator-interface";
import { UseCase } from "../../abstract/classes/usecase";

export namespace GetDashboardDataUseCase {
    export const Input = {};

    export const Output = {
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
    }

    export class Service extends UseCase {
        private readonly dashboardRepository: DashboardsRepository;

        public constructor() {
            super();
            this.dashboardRepository = new DashboardsRepository();
        }

        public setValidators(): ValidatorInterface[] {
            return [];
        }

        public async handle(input: typeof Input): Promise<typeof Output | Error> {
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
}
