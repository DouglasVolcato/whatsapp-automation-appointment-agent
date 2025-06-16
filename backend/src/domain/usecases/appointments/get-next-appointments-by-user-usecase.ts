import { AppointmentRepositorty } from "../../../infra/repositories/appointment-repository";
import { ValidatorInterface } from "../../abstract/interfaces/validator-interface";
import { AppointmentEntity } from "../../abstract/entities/appointment-entity";
import { UseCase } from "../../abstract/classes/usecase";
import {
    ValidatorBuilder,
    ValidatorTypeEnum,
} from "../../utils/validator-builder";

export namespace GetNextAppointmentsByUserUseCase {
    export const Input = {
        user_id: ""
    };

    export const Output: AppointmentEntity[] = [];

    export class Service extends UseCase {
        private readonly appointmentsRepositorty: AppointmentRepositorty;

        public constructor() {
            super();
            this.appointmentsRepositorty = new AppointmentRepositorty();
        }

        public setValidators(): ValidatorInterface[] {
            return [
                new ValidatorBuilder()
                    .setField("user_id")
                    .addType(ValidatorTypeEnum.REQUIRED)
                    .addType(ValidatorTypeEnum.STRING)
                    .setMessage("Usuário é inválido")
                    .build(),
            ];
        }

        public async handle(input: typeof Input): Promise<typeof Output | Error> {
            return await this.appointmentsRepositorty.getManyByUser({
                user_id: input.user_id
            });
        }
    }
}
