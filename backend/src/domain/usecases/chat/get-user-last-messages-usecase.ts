import { UserLastMessagesRepositorty } from "../../../infra/repositories/user-last-messages-repository";
import { ValidatorInterface } from "../../abstract/interfaces/validator-interface";
import { MessageSenderEnum } from "../../../ia/agents/llm-agent";
import { UseCase } from "../../abstract/classes/usecase";
import {
  ValidatorBuilder,
  ValidatorTypeEnum,
} from "../../utils/validator-builder";

export namespace GetUserLastMessagesUseCase {
  export const Input = {
    user_id: "",
  };

  export const Output = [
    {
      id: '',
      user_id: '',
      sender: MessageSenderEnum.USER,
      content: '',
      created_at: '',
    }
  ];

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
      ];
    }

    public async handle(input: typeof Input): Promise<typeof Output | Error> {
      return await this.userLastMessagesRepositorty.findMany({
        params: [{
          key: 'user_id',
          value: input.user_id
        }],
        limit: 4,
        offset: 0,
        orderByAsc: true,
      })
    }
  }
}
