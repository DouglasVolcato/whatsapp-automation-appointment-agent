"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdUseCase = void 0;
const conversation_state_enum_1 = require("../../abstract/enums/conversation-state-enum");
const users_repository_1 = require("../../../infra/repositories/users-repository");
const usecase_1 = require("../../abstract/classes/usecase");
const validator_builder_1 = require("../../utils/validator-builder");
var GetUserByIdUseCase;
(function (GetUserByIdUseCase) {
    GetUserByIdUseCase.Input = { id: "" };
    GetUserByIdUseCase.Output = {
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
    class Service extends usecase_1.UseCase {
        constructor() {
            super();
            this.usersRepositorty = new users_repository_1.UsersRepositorty();
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
        }
        async handle(input) {
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
    GetUserByIdUseCase.Service = Service;
})(GetUserByIdUseCase || (exports.GetUserByIdUseCase = GetUserByIdUseCase = {}));
