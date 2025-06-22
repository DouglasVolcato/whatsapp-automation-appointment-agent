"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAppointmentUseCase = void 0;
const appointment_repository_1 = require("../../../infra/repositories/appointment-repository");
const usecase_1 = require("../../abstract/classes/usecase");
const validator_builder_1 = require("../../utils/validator-builder");
var DeleteAppointmentUseCase;
(function (DeleteAppointmentUseCase) {
    DeleteAppointmentUseCase.Input = {
        appointment_id: ""
    };
    DeleteAppointmentUseCase.Output = {
        message: ""
    };
    class Service extends usecase_1.UseCase {
        constructor() {
            super();
            this.appointmentsRepositorty = new appointment_repository_1.AppointmentRepositorty();
        }
        setValidators() {
            return [
                new validator_builder_1.ValidatorBuilder()
                    .setField("appointment_id")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Reunião é inválida")
                    .build(),
            ];
        }
        async handle(input) {
            await this.appointmentsRepositorty.delete({
                params: [
                    {
                        key: "id",
                        value: input.appointment_id
                    }
                ]
            });
            return { message: "Reunião excluida com sucesso" };
        }
    }
    DeleteAppointmentUseCase.Service = Service;
})(DeleteAppointmentUseCase || (exports.DeleteAppointmentUseCase = DeleteAppointmentUseCase = {}));
