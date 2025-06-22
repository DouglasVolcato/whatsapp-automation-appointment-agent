"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertUserLastMessageUseCase = void 0;
const user_last_messages_repository_1 = require("../../../infra/repositories/user-last-messages-repository");
const uuid_generator_1 = require("../../utils/uuid-generator");
const usecase_1 = require("../../abstract/classes/usecase");
const validator_builder_1 = require("../../utils/validator-builder");
var InsertUserLastMessageUseCase;
(function (InsertUserLastMessageUseCase) {
    InsertUserLastMessageUseCase.Input = {
        user_id: "",
        sender: "",
        content: "",
    };
    InsertUserLastMessageUseCase.Output = { message: '' };
    class Service extends usecase_1.UseCase {
        constructor() {
            super();
            this.userLastMessagesRepositorty = new user_last_messages_repository_1.UserLastMessagesRepositorty();
        }
        setValidators() {
            return [
                new validator_builder_1.ValidatorBuilder()
                    .setField("user_id")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Usuário é inválido")
                    .build(),
                new validator_builder_1.ValidatorBuilder()
                    .setField("sender")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Envio é inválido")
                    .build(),
                new validator_builder_1.ValidatorBuilder()
                    .setField("content")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Mensagem é inválida")
                    .build(),
            ];
        }
        async handle(input) {
            await this.userLastMessagesRepositorty.insert({
                fields: [
                    {
                        key: 'id',
                        value: uuid_generator_1.UuidGenerator.generate()
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
            });
            await this.userLastMessagesRepositorty.deleteOldMessages(input.user_id);
            return {
                message: 'Mensagem inserida com sucesso'
            };
        }
    }
    InsertUserLastMessageUseCase.Service = Service;
})(InsertUserLastMessageUseCase || (exports.InsertUserLastMessageUseCase = InsertUserLastMessageUseCase = {}));
