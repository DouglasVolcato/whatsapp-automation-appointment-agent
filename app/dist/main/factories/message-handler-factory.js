"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMessageHandler = makeMessageHandler;
const get_user_last_messages_usecase_1 = require("../../domain/usecases/chat/get-user-last-messages-usecase");
const insert_user_last_message_usecase_1 = require("../../domain/usecases/chat/insert-user-last-message-usecase");
const get_user_by_number_usecase_1 = require("../../domain/usecases/users/get-user-by-number-usecase");
const llm_agent_1 = require("../../ia/agents/llm-agent");
const llm_agent_factory_1 = require("./llm-agent-factory");
function makeMessageHandler() {
    const getUserByNumberUseCase = new get_user_by_number_usecase_1.GetUserByNumberUseCase.Service();
    const getUserLastMessagesUseCase = new get_user_last_messages_usecase_1.GetUserLastMessagesUseCase.Service();
    const insertUserLastMessageUseCase = new insert_user_last_message_usecase_1.InsertUserLastMessageUseCase.Service();
    function formatWhatsappMessage(content) {
        return `*Assistente*: ${content}`;
    }
    async function handleMessages(input) {
        const user = await getUserByNumberUseCase.execute({ number: input.number });
        for (const message of input.lastMessages) {
            await insertUserLastMessageUseCase.execute({
                user_id: user.id,
                sender: message.sender,
                content: message.content,
            });
        }
        const lastMessages = await getUserLastMessagesUseCase.execute({
            user_id: user.id,
        });
        const agent = await new llm_agent_factory_1.LlmAgentFactory({
            user: user,
        }).getAgent();
        for (const message of lastMessages) {
            agent.addMessage({
                content: message.content,
                role: message.sender,
            });
        }
        const response = await agent.getResponse();
        const newConversationState = await getUserByNumberUseCase.execute({ number: input.number });
        if (newConversationState.conversation_state !== user.conversation_state) {
            return await handleMessages({
                number: input.number,
                lastMessages: [
                    ...lastMessages,
                    {
                        content: formatWhatsappMessage(response.response),
                        sender: llm_agent_1.MessageSenderEnum.ASSISTANT,
                    },
                ],
            });
        }
        await insertUserLastMessageUseCase.execute({
            user_id: user.id,
            sender: llm_agent_1.MessageSenderEnum.ASSISTANT,
            content: formatWhatsappMessage(response.response),
        });
        return formatWhatsappMessage(response.response);
    }
    return handleMessages;
}
