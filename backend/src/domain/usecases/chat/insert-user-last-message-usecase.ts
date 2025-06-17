import { UserLastMessagesRepositorty } from "../../../infra/repositories/user-last-messages-repository";
import { ValidatorInterface } from "../../abstract/interfaces/validator-interface";
import { UuidGenerator } from "../../utils/uuid-generator";
import { UseCase } from "../../abstract/classes/usecase";
import {
  ValidatorBuilder,
  ValidatorTypeEnum,
} from "../../utils/validator-builder";

export namespace InsertUserLastMessageUseCase {
  export const Input = {
    user_id: "",
    sender: "",
    content: "",
  };

  export const Output = { message: '' };

  export class Service extends UseCase {
    private readonly userLastMessagesRepositorty: UserLastMessagesRepositorty;

    public constructor() {
      super();
      this.userLastMessagesRepositorty = new UserLastMessagesRepositorty();
    }

    public setValidators(): ValidatorInterface[] {
      return [
        new ValidatorBuilder()
          .setField("user_id")
          .addType(ValidatorTypeEnum.REQUIRED)
          .addType(ValidatorTypeEnum.STRING)
          .setMessage("Usuário é inválido")
          .build(),
        new ValidatorBuilder()
          .setField("sender")
          .addType(ValidatorTypeEnum.REQUIRED)
          .addType(ValidatorTypeEnum.STRING)
          .setMessage("Envio é inválido")
          .build(),
        new ValidatorBuilder()
          .setField("content")
          .addType(ValidatorTypeEnum.REQUIRED)
          .addType(ValidatorTypeEnum.STRING)
          .setMessage("Mensagem é inválida")
          .build(),
      ];
    }

    public async handle(input: typeof Input): Promise<typeof Output | Error> {
      await this.userLastMessagesRepositorty.insert({
        fields: [
          {
            key: 'id',
            value: UuidGenerator.generate()
          },
          {
            key: 'user_id',
            value: input.user_id
          },
          {
            key: 'sender',
            value: input.sender
          },
          {
            key: 'content',
            value: input.content
          }
        ]
      })

      await this.userLastMessagesRepositorty.deleteOldMessages(input.user_id);

      return {
        message: 'Mensagem inserida com sucesso'
      }
    }
  }
}
