"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNextAppointmentsByUserUseCase = void 0;
const appointment_repository_1 = require("../../../infra/repositories/appointment-repository");
const usecase_1 = require("../../abstract/classes/usecase");
const validator_builder_1 = require("../../utils/validator-builder");
var GetNextAppointmentsByUserUseCase;
(function (GetNextAppointmentsByUserUseCase) {
    GetNextAppointmentsByUserUseCase.Input = {
        user_id: ""
    };
    GetNextAppointmentsByUserUseCase.Output = [];
    class Service extends usecase_1.UseCase {
        constructor() {
            super();
            this.appointmentsRepositorty = new appointment_repository_1.AppointmentRepositorty();
        }
        setValidators() {
            return [
                new validator_builder_1.ValidatorBuilder()
                    .setField("user_id")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Usuário é inválido")
                    .build(),
            ];
        }
        async handle(input) {
            return await this.appointmentsRepositorty.getManyByUser({
                user_id: input.user_id
            });
        }
    }
    GetNextAppointmentsByUserUseCase.Service = Service;
})(GetNextAppointmentsByUserUseCase || (exports.GetNextAppointmentsByUserUseCase = GetNextAppointmentsByUserUseCase = {}));
