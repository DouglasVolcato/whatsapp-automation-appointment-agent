"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCase = void 0;
const validator_builder_1 = require("../../utils/validator-builder");
const conversation_state_enum_1 = require("../../abstract/enums/conversation-state-enum");
const users_repository_1 = require("../../../infra/repositories/users-repository");
const usecase_1 = require("../../abstract/classes/usecase");
var UpdateUserUseCase;
(function (UpdateUserUseCase) {
    UpdateUserUseCase.Input = {
        id: "",
        name: "",
        email: "",
        phone: "",
        relation_with_master: "",
        what_likes: "",
        what_knows: "",
        what_does: "",
        conversation_state: conversation_state_enum_1.ConversationState.getting_info,
        created_at: "",
        updated_at: "",
    };
    UpdateUserUseCase.Output = { message: "" };
    class Service extends usecase_1.UseCase {
        constructor() {
            super();
            this.usersRepository = new users_repository_1.UsersRepositorty();
        }
        setValidators() {
            return [
                new validator_builder_1.ValidatorBuilder()
                    .setField("id")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Usuário é inválido")
                    .build(),
            ];
            ;
        }
        async handle(input) {
            const foundUser = await this.usersRepository.findOne({
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
    UpdateUserUseCase.Service = Service;
})(UpdateUserUseCase || (exports.UpdateUserUseCase = UpdateUserUseCase = {}));
