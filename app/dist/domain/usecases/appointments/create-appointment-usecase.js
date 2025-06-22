"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentUseCase = void 0;
const appointment_repository_1 = require("../../../infra/repositories/appointment-repository");
const uuid_generator_1 = require("../../utils/uuid-generator");
const usecase_1 = require("../../abstract/classes/usecase");
const validator_builder_1 = require("../../utils/validator-builder");
var CreateAppointmentUseCase;
(function (CreateAppointmentUseCase) {
    CreateAppointmentUseCase.Input = {
        user_id: '',
        date_time: '',
        title: '',
        description: '',
    };
    CreateAppointmentUseCase.Output = {
        message: "",
        appointment: {
            id: '',
            user_id: '',
            date_time: '',
            title: '',
            description: '',
            created_at: '',
            updated_at: '',
        }
    };
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
                    .setMessage("Usuário é inválida")
                    .build(),
                new validator_builder_1.ValidatorBuilder()
                    .setField("date_time")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Data/hora é inválida")
                    .build(),
                new validator_builder_1.ValidatorBuilder()
                    .setField("title")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Título é inválido")
                    .build(),
                new validator_builder_1.ValidatorBuilder()
                    .setField("description")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Descrição é inválida")
                    .build(),
            ];
        }
        async handle(input) {
            const id = uuid_generator_1.UuidGenerator.generate();
            await this.appointmentsRepositorty.insert({
                fields: [
                    {
                        key: "id",
                        value: id
                    },
                    {
                        key: "user_id",
                        value: input.user_id
                    },
                    {
                        key: "date_time",
                        value: input.date_time
                    },
                    {
                        key: "title",
                        value: input.title
                    },
                    {
                        key: "description",
                        value: input.description
                    }
                ]
            });
            const appointment = await this.appointmentsRepositorty.findOne({
                params: [
                    {
                        key: "id",
                        value: id
                    }
                ]
            });
            return { message: "Reunião criada com sucesso", appointment: appointment };
        }
    }
    CreateAppointmentUseCase.Service = Service;
})(CreateAppointmentUseCase || (exports.CreateAppointmentUseCase = CreateAppointmentUseCase = {}));
