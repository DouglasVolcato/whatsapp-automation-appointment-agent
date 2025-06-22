"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAvailableHoursByDayUseCase = void 0;
const appointment_repository_1 = require("../../../infra/repositories/appointment-repository");
const usecase_1 = require("../../abstract/classes/usecase");
const validator_builder_1 = require("../../utils/validator-builder");
var GetAvailableHoursByDayUseCase;
(function (GetAvailableHoursByDayUseCase) {
    GetAvailableHoursByDayUseCase.Input = {
        day: "",
    };
    GetAvailableHoursByDayUseCase.Output = [];
    class Service extends usecase_1.UseCase {
        constructor() {
            super();
            this.appointmentsRepositorty = new appointment_repository_1.AppointmentRepositorty();
        }
        setValidators() {
            return [
                new validator_builder_1.ValidatorBuilder()
                    .setField("day")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Dia é inválido")
                    .build(),
            ];
        }
        async handle(input) {
            return await this.appointmentsRepositorty.getAvailableHours({
                day: input.day,
            });
        }
    }
    GetAvailableHoursByDayUseCase.Service = Service;
})(GetAvailableHoursByDayUseCase || (exports.GetAvailableHoursByDayUseCase = GetAvailableHoursByDayUseCase = {}));
