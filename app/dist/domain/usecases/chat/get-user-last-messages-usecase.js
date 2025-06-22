"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserLastMessagesUseCase = void 0;
const user_last_messages_repository_1 = require("../../../infra/repositories/user-last-messages-repository");
const llm_agent_1 = require("../../../ia/agents/llm-agent");
const usecase_1 = require("../../abstract/classes/usecase");
const validator_builder_1 = require("../../utils/validator-builder");
var GetUserLastMessagesUseCase;
(function (GetUserLastMessagesUseCase) {
    GetUserLastMessagesUseCase.Input = {
        user_id: "",
    };
    GetUserLastMessagesUseCase.Output = [
        {
            id: '',
            user_id: '',
            sender: llm_agent_1.MessageSenderEnum.USER,
            content: '',
            created_at: '',
        }
    ];
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
            ];
        }
        async handle(input) {
            return await this.userLastMessagesRepositorty.findMany({
                params: [{
                        key: 'user_id',
                        value: input.user_id
                    }],
                limit: 4,
                offset: 0,
                orderByAsc: true,
            });
        }
    }
    GetUserLastMessagesUseCase.Service = Service;
})(GetUserLastMessagesUseCase || (exports.GetUserLastMessagesUseCase = GetUserLastMessagesUseCase = {}));
