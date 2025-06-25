import { GetUserLastMessagesUseCase } from "../../domain/usecases/chat/get-user-last-messages-usecase";
import { InsertUserLastMessageUseCase } from "../../domain/usecases/chat/insert-user-last-message-usecase";
import { GetUserByNumberUseCase } from "../../domain/usecases/users/get-user-by-number-usecase";
import { ChatMessage } from "../../domain/utils/whatsapp-interactor";
import { MessageSenderEnum } from "../../ia/agents/llm-agent";
import { LlmAgentFactory } from "./llm-agent-factory";
import { Logger } from "../../domain/utils/logger";

export function makeMessageHandler() {
  const getUserByNumberUseCase = new GetUserByNumberUseCase.Service();
  const getUserLastMessagesUseCase = new GetUserLastMessagesUseCase.Service();
  const insertUserLastMessageUseCase = new InsertUserLastMessageUseCase.Service();

  function formatWhatsappMessage(content: string): string {
    return `*Assistente*: ${content}`;
  }

  async function handleMessages(input: {
    number: string;
    lastMessages: ChatMessage[];
  }): Promise<string | null> {
    try {
      Logger.writeLog(
        "logs/whatsapp.txt",
        `[MESSAGE] ${input.number} - ${JSON.stringify(input.lastMessages[input.lastMessages.length - 1])}`,
      );
      const user: typeof GetUserByNumberUseCase.Output =
        await getUserByNumberUseCase.execute({ number: input.number });

      for (const message of input.lastMessages) {
        await insertUserLastMessageUseCase.execute({
          user_id: user.id,
          sender: message.sender,
          content: message.content,
        });
      }

      const lastMessages: typeof GetUserLastMessagesUseCase.Output =
        await getUserLastMessagesUseCase.execute({
          user_id: user.id,
        });

      const agent = await new LlmAgentFactory({
        user: user,
      }).getAgent();

      for (const message of lastMessages) {
        agent.addMessage({
          content: message.content,
          role: message.sender,
        });
      }

      const response = await agent.getResponse();

      const newConversationState: typeof GetUserByNumberUseCase.Output =
        await getUserByNumberUseCase.execute({ number: input.number });

      if (newConversationState.conversation_state !== user.conversation_state) {
        return await handleMessages({
          number: input.number,
          lastMessages: [
            ...lastMessages,
            {
              content: formatWhatsappMessage(response.response),
              sender: MessageSenderEnum.ASSISTANT,
            },
          ],
        });
      }

      await insertUserLastMessageUseCase.execute({
        user_id: user.id,
        sender: MessageSenderEnum.ASSISTANT,
        content: formatWhatsappMessage(response.response),
      });

      const formatedResponse = formatWhatsappMessage(response.response);
      Logger.writeLog("logs/whatsapp.txt", `[REPLY] ${formatedResponse}`);
      return formatedResponse;
    } catch (error: any) {
      Logger.error(error);
      return null;
    }
  }

  return handleMessages;
}
