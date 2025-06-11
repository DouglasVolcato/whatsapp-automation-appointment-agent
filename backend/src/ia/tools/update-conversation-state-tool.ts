import { UpdateConversationStateUseCase } from "../../domain/usecases/user-conversation-state/update-conversation-state-usecase";
import { LlmToolType } from "../../domain/abstract/types/llm-tool-type";
import { LlmTool } from "../abstract/classes/llm-tool";
import { z } from "zod";

export class UpdateConversationStateTool extends LlmTool {
  private readonly updateConversationState: UpdateConversationStateUseCase.Service;

  public constructor() {
    super();
    this.updateConversationState = new UpdateConversationStateUseCase.Service();
  }

  public getInstance(): LlmToolType {
    return {
      callback: this.execute.bind(this),
      name: "atualizar-estado-conversa",
      schema: z.object({
        user_id: z.string(),
        status: z.string(),
      }),
      description:
        'Atualiza o estado atual da conversa, podendo ser "Apresentação", "Buscando propriedades", "Propriedade comprada/alugada"',
    };
  }

  private async execute(
    input: typeof UpdateConversationStateUseCase.Input
  ): Promise<string> {
    return JSON.stringify(await this.updateConversationState.execute(input));
  }
}
