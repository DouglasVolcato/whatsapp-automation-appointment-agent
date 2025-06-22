"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByNumberUseCase = void 0;
const conversation_state_enum_1 = require("../../abstract/enums/conversation-state-enum");
const users_repository_1 = require("../../../infra/repositories/users-repository");
const uuid_generator_1 = require("../../utils/uuid-generator");
const usecase_1 = require("../../abstract/classes/usecase");
const validator_builder_1 = require("../../utils/validator-builder");
var GetUserByNumberUseCase;
(function (GetUserByNumberUseCase) {
    GetUserByNumberUseCase.Input = { number: "" };
    GetUserByNumberUseCase.Output = {
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
                    .setField("number")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Número é inválido")
                    .build(),
            ];
        }
        async handle(input) {
            const foundUser = await this.usersRepositorty.findOne({
                params: [
                    {
                        key: "phone",
                        value: input.number,
                    },
                ],
            });
            if (foundUser) {
                return foundUser;
            }
            const id = uuid_generator_1.UuidGenerator.generate();
            await this.usersRepositorty.insert({
                fields: [
                    {
                        key: "id",
                        value: id,
                    },
                    {
                        key: "name",
                        value: "",
                    },
                    {
                        key: "email",
                        value: "",
                    },
                    {
                        key: "phone",
                        value: input.number,
                    },
                    {
                        key: "conversation_state",
                        value: conversation_state_enum_1.ConversationState.getting_info,
                    },
                ],
            });
            return await this.usersRepositorty.findOne({
                params: [
                    {
                        key: "id",
                        value: id,
                    },
                ],
            });
        }
    }
    GetUserByNumberUseCase.Service = Service;
})(GetUserByNumberUseCase || (exports.GetUserByNumberUseCase = GetUserByNumberUseCase = {}));
