import {
  AppointmentEntity,
  CreateAppointmentDto,
} from "../../abstract/entities/appointment-entity";
import { AppointmentRepositorty } from "../../../infra/repositories/appointment-repository";
import { ValidatorInterface } from "../../abstract/interfaces/validator-interface";
import { UuidGenerator } from "../../utils/uuid-generator";
import { UseCase } from "../../abstract/classes/usecase";
import {
  ValidatorBuilder,
  ValidatorTypeEnum,
} from "../../utils/validator-builder";

export namespace CreateAppointmentUseCase {
  export const Input: CreateAppointmentDto = {
    user_id: "",
    date_time: "",
    title: "",
    description: "",
  };

  export const Output: { message: string; appointment: AppointmentEntity } = {
    message: "",
    appointment: {
      id: "",
      user_id: "",
      date_time: "",
      title: "",
      description: "",
      created_at: "",
      updated_at: "",
    },
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
          .setField("user_id")
          .addType(ValidatorTypeEnum.REQUIRED)
          .addType(ValidatorTypeEnum.STRING)
          .setMessage("Usuário é inválida")
          .build(),
        new ValidatorBuilder()
          .setField("date_time")
          .addType(ValidatorTypeEnum.REQUIRED)
          .addType(ValidatorTypeEnum.STRING)
          .setMessage("Data/hora é inválida")
          .build(),
        new ValidatorBuilder()
          .setField("title")
          .addType(ValidatorTypeEnum.REQUIRED)
          .addType(ValidatorTypeEnum.STRING)
          .setMessage("Título é inválido")
          .build(),
        new ValidatorBuilder()
          .setField("description")
          .addType(ValidatorTypeEnum.REQUIRED)
          .addType(ValidatorTypeEnum.STRING)
          .setMessage("Descrição é inválida")
          .build(),
      ];
    }

    public async handle(input: typeof Input): Promise<typeof Output | Error> {
      const id = UuidGenerator.generate();

      const isHouravailable =
        await this.appointmentsRepositorty.checkIfDatetimeIsAvailable({
          date_time: input.date_time,
        });

      if (!isHouravailable.is_available) {
        return new Error("Hora indisponível");
      }

      await this.appointmentsRepositorty.insert({
        fields: [
          {
            key: "id",
            value: id,
          },
          {
            key: "user_id",
            value: input.user_id,
          },
          {
            key: "date_time",
            value: input.date_time,
          },
          {
            key: "title",
            value: input.title,
          },
          {
            key: "description",
            value: input.description,
          },
        ],
      });

      const appointment = await this.appointmentsRepositorty.findOne({
        params: [
          {
            key: "id",
            value: id,
          },
        ],
      });

      return {
        message: "Reunião criada com sucesso",
        appointment: appointment,
      };
    }
  }
}
