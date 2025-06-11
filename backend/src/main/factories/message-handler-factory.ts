import { GetPropertyAvailableTypesUseCase } from "../../domain/usecases/properties/get-property-available-types-statistics-usecase";
import { GetConversationStateUseCase } from "../../domain/usecases/user-conversation-state/get-conversation-state-usecase";
import { InsertUserLastMessageUseCase } from "../../domain/usecases/chat/insert-user-last-message-usecase";
import { GetUserLastMessagesUseCase } from "../../domain/usecases/chat/get-user-last-messages-usecase";
import { GetUserPreferencesUseCase } from "../../domain/usecases/users/get-user-preferences-usecase";
import { GetUserByNumberUseCase } from "../../domain/usecases/users/get-user-by-number-usecase";
import { ChatMessage } from "../../domain/utils/whatsapp-interactor";
import { MessageSenderEnum } from "../../ia/agents/llm-agent";
import { LlmAgentFactory } from "./llm-agent-factory";

export function makeMessageHandler() {
  const getUserPreferencesUseCase = new GetUserPreferencesUseCase.Service();
  const getConversationStateUseCase = new GetConversationStateUseCase.Service();
  const getUserByNumberUseCase = new GetUserByNumberUseCase.Service();
  const getPropertyAvailableTypesUseCase = new GetPropertyAvailableTypesUseCase.Service();
  const getUserLastMessagesUseCase = new GetUserLastMessagesUseCase.Service();
  const insertUserLastMessageUseCase = new InsertUserLastMessageUseCase.Service();

  async function handleMessages(input: {
    number: string;
    lastMessages: ChatMessage[];
  }): Promise<string | null> {
    const user: typeof GetUserByNumberUseCase.Output = await getUserByNumberUseCase.execute({ number: input.number });

    for (const message of input.lastMessages) {
      await insertUserLastMessageUseCase.execute({
        user_id: user.id,
        sender: message.sender,
        content: message.content,
      });
    }

    const lastMessages: typeof GetUserLastMessagesUseCase.Output = await getUserLastMessagesUseCase.execute({
      user_id: user.id,
    });

    console.log(lastMessages)

    const preferences: typeof GetUserPreferencesUseCase.Output = await getUserPreferencesUseCase.execute({
      user_id: user.id,
    });
    const conversationState: typeof GetConversationStateUseCase.Output = await getConversationStateUseCase.execute({
      user_id: user.id,
    });
    const propertyTypes: typeof GetPropertyAvailableTypesUseCase.Output = await getPropertyAvailableTypesUseCase.execute({});

    const agent = new LlmAgentFactory({
      user: user,
      userPreferences: preferences,
      conversationState: conversationState.status,
      availablePropertyTypes: propertyTypes.property_types,
      availableConditionTypes: propertyTypes.condition_types,
    }).getAgent();

    for (const message of lastMessages) {
      agent.addMessage({
        content: message.content,
        role: message.sender,
      });
    }

    const response = await agent.getResponse();

    const newConversationState: typeof GetConversationStateUseCase.Output = await getConversationStateUseCase.execute({
      user_id: user.id,
    });

    if (newConversationState.status !== conversationState.status) {
      return await handleMessages({
        number: input.number,
        lastMessages: [
          ...lastMessages,
          {
            content: response.response,
            sender: MessageSenderEnum.ASSISTANT,
          },
        ],
      });
    }

    let ress = await insertUserLastMessageUseCase.execute({
        user_id: user.id,
        sender: MessageSenderEnum.ASSISTANT,
        content: response.response,
      });

    return response.response;
  }

  return handleMessages;
}
