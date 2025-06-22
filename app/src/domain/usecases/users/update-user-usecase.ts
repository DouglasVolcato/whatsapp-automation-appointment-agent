import { ValidatorBuilder, ValidatorTypeEnum } from "../../utils/validator-builder";
import { ValidatorInterface } from "../../abstract/interfaces/validator-interface";
import { ConversationState } from "../../abstract/enums/conversation-state-enum";
import { UsersRepositorty } from "../../../infra/repositories/users-repository";
import { UserEntity } from "../../abstract/entities/user-entity";
import { UseCase } from "../../abstract/classes/usecase";


export namespace UpdateUserUseCase {
  export const Input: UserEntity = {
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

  export const Output = { message: "" };

  export class Service extends UseCase {
    private readonly usersRepository: UsersRepositorty;

    public constructor() {
      super();
      this.usersRepository = new UsersRepositorty();
    }

    public setValidators(): ValidatorInterface[] {
      return [
        new ValidatorBuilder()
          .setField("id")
          .addType(ValidatorTypeEnum.REQUIRED)
          .addType(ValidatorTypeEnum.STRING)
          .setMessage("Usuário é inválido")
          .build(),
      ];;
    }

    public async handle(input: typeof Input): Promise<typeof Output | Error> {
      const foundUser: UserEntity =
        await this.usersRepository.findOne({
          params: [
            {
              key: "id",
              value: input.id,
            },
          ],
        });


      await this.usersRepository.update({
        id: input.id,
        fields: [
          { key: 'name', value: input.name || foundUser.name || '' },
          { key: 'phone', value: input.phone || foundUser.phone || '' },
          { key: 'email', value: input.email || foundUser.email || '' },
          { key: 'relation_with_master', value: input.relation_with_master || foundUser.relation_with_master || '' },
          { key: 'what_likes', value: input.what_likes || foundUser.what_likes || '' },
          { key: 'what_knows', value: input.what_knows || foundUser.what_knows || '' },
          { key: 'what_does', value: input.what_does || foundUser.what_does || '' },
          { key: 'conversation_state', value: input.conversation_state || foundUser.conversation_state || '' },
        ],
      });

      return { message: "Usuários atualizado com sucesso" };
    }
  }
}
