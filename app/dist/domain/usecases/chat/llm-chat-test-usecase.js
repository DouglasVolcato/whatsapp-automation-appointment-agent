"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlmChatTestUseCase = void 0;
const message_handler_factory_1 = require("../../../main/factories/message-handler-factory");
const llm_agent_1 = require("../../../ia/agents/llm-agent");
const usecase_1 = require("../../abstract/classes/usecase");
const validator_builder_1 = require("../../utils/validator-builder");
var LlmChatTestUseCase;
(function (LlmChatTestUseCase) {
    LlmChatTestUseCase.Input = ({
        number: "",
        messages: [],
    });
    LlmChatTestUseCase.Output = {
        response: "",
    };
    class Service extends usecase_1.UseCase {
        constructor() {
            super();
            this.messageHandler = (0, message_handler_factory_1.makeMessageHandler)();
        }
        setValidators() {
            return [
                new validator_builder_1.ValidatorBuilder()
                    .setField("number")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .setMessage("Número inválido")
                    .build(),
                new validator_builder_1.ValidatorBuilder()
                    .setField("messages")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .setMessage("Mensagens inválidas")
                    .build(),
            ];
        }
        async handle(input) {
            const messages = [];
            for (const message of input.messages) {
                messages.push({
                    content: message,
                    sender: llm_agent_1.MessageSenderEnum.USER,
                });
            }
            const response = await this.messageHandler({
                number: input.number,
                lastMessages: messages.slice(-3),
            });
            return { response: response || "Erro conectar com o agente." };
        }
    }
    LlmChatTestUseCase.Service = Service;
})(LlmChatTestUseCase || (exports.LlmChatTestUseCase = LlmChatTestUseCase = {}));
