import { GetConversationStateUseCase } from "../../domain/usecases/user-conversation-state/get-conversation-state-usecase";
import { LlmToolType } from "../../domain/abstract/types/llm-tool-type";
import { LlmTool } from "../abstract/classes/llm-tool";
import { z } from "zod";

export class GetConversationStateTool extends LlmTool {
  private readonly getConversationState: GetConversationStateUseCase.Service;

  public constructor() {
    super();
    this.getConversationState = new GetConversationStateUseCase.Service();
  }

  public getInstance(): LlmToolType {
    return {
      callback: this.execute.bind(this),
      name: "buscar-estado-conversa",
      schema: z.object({
        user_id: z.string(),
      }),
      description:
        'Busca o estado atual da conversa, podendo ser "Apresentação", "Buscando propriedades", "Propriedade comprada/alugada"',
    };
  }

  private async execute(
    input: typeof GetConversationStateUseCase.Input
  ): Promise<string> {
    return JSON.stringify(await this.getConversationState.execute(input));
  }
}
