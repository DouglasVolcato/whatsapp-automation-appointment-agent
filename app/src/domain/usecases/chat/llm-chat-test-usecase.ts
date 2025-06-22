import { makeMessageHandler } from "../../../main/factories/message-handler-factory";
import { ValidatorInterface } from "../../abstract/interfaces/validator-interface";
import { MessageSenderEnum } from "../../../ia/agents/llm-agent";
import { ChatMessage } from "../../utils/whatsapp-interactor";
import { UseCase } from "../../abstract/classes/usecase";
import {
  ValidatorBuilder,
  ValidatorTypeEnum,
} from "../../utils/validator-builder";

export namespace LlmChatTestUseCase {
  export const Input = ({
    number: "",
    messages: [] as string[],
  });

  export const Output = {
    response: "",
  };

  export class Service extends UseCase {
    private messageHandler: ReturnType<typeof makeMessageHandler>;

    public constructor() {
      super();
      this.messageHandler = makeMessageHandler();
    }

    public setValidators(): ValidatorInterface[] {
      return [
        new ValidatorBuilder()
          .setField("number")
          .addType(ValidatorTypeEnum.REQUIRED)
          .setMessage("Número inválido")
          .build(),
        new ValidatorBuilder()
          .setField("messages")
          .addType(ValidatorTypeEnum.REQUIRED)
          .setMessage("Mensagens inválidas")
          .build(),
      ];
    }

    public async handle(input: typeof Input): Promise<typeof Output | Error> {
      const messages: ChatMessage[] = [];

      for (const message of input.messages) {
        messages.push({
          content: message,
          sender: MessageSenderEnum.USER,
        });
      }

      const response = await this.messageHandler({
        number: input.number,
        lastMessages: messages.slice(-3),
      });

      return { response: response || "Erro conectar com o agente." };
    }
  }
}
