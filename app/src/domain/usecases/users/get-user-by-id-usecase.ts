import { ValidatorInterface } from "../../abstract/interfaces/validator-interface";
import { ConversationState } from "../../abstract/enums/conversation-state-enum";
import { UsersRepositorty } from "../../../infra/repositories/users-repository";
import { UserEntity } from "../../abstract/entities/user-entity";
import { UseCase } from "../../abstract/classes/usecase";
import {
  ValidatorBuilder,
  ValidatorTypeEnum,
} from "../../utils/validator-builder";

export namespace GetUserByIdUseCase {
  export const Input = { id: "" };

  export const Output: UserEntity = {
    id: "",
    name: "",
    email: "",
    phone: "",
    relation_with_master: "",
    what_likes: "",
    what_knows: "",
    what_does: "",
    conversation_state: ConversationState.getting_info,
    created_at: "",
    updated_at: "",
  };

  export class Service extends UseCase {
    private readonly usersRepositorty: UsersRepositorty;

    public constructor() {
      super();
      this.usersRepositorty = new UsersRepositorty();
    }

    public setValidators(): ValidatorInterface[] {
      return [
        new ValidatorBuilder()
          .setField("id")
          .addType(ValidatorTypeEnum.REQUIRED)
          .addType(ValidatorTypeEnum.STRING)
          .setMessage("Usuário é inválido")
          .build(),
      ];
    }

    public async handle(input: typeof Input): Promise<typeof Output | Error> {
      return await this.usersRepositorty.findOne({
        params: [
          {
            key: "id",
            value: input.id,
          },
        ],
      });
    }
  }
}
