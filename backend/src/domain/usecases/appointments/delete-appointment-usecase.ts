import { AppointmentRepositorty } from "../../../infra/repositories/appointment-repository";
import { ValidatorInterface } from "../../abstract/interfaces/validator-interface";
import { UseCase } from "../../abstract/classes/usecase";
import {
    ValidatorBuilder,
    ValidatorTypeEnum,
} from "../../utils/validator-builder";

export namespace DeleteAppointmentUseCase {
    export const Input = {
        appointment_id: ""
    };

    export const Output = {
        message: ""
    };

    export class Service extends UseCase {
        private readonly appointmentsRepositorty: AppointmentRepositorty;

        public constructor() {
            super();
            this.appointmentsRepositorty = new AppointmentRepositorty();
        }

        public setValidators(): ValidatorInterface[] {
            return [
                new ValidatorBuilder()
                    .setField("appointment_id")
                    .addType(ValidatorTypeEnum.REQUIRED)
                    .addType(ValidatorTypeEnum.STRING)
                    .setMessage("Reunião é inválida")
                    .build(),
            ];
        }

        public async handle(input: typeof Input): Promise<typeof Output | Error> {
            await this.appointmentsRepositorty.delete({
                params: [
                    {
                        key: "id",
                        value: input.appointment_id
                    }
                ]
            })

            return { message: "Reunião excluida com sucesso" };
        }
    }
}
