import { GetUserPreferencesUseCase } from "../../domain/usecases/users/get-user-preferences-usecase";
import { LlmToolType } from "../../domain/abstract/types/llm-tool-type";
import { LlmTool } from "../abstract/classes/llm-tool";
import { z } from "zod";

export class GetUserPreferencesTool extends LlmTool {
  private readonly getUserPreferences: GetUserPreferencesUseCase.Service;

  public constructor() {
    super();
    this.getUserPreferences = new GetUserPreferencesUseCase.Service();
  }

  public getInstance(): LlmToolType {
    return {
      callback: this.execute.bind(this),
      name: "busca-preferencias-usuario",
      schema: z.object({
        user_id: z.string(),
      }),
      description: "Busca as preferências do usuário",
    };
  }

  private async execute(
    input: typeof GetUserPreferencesUseCase.Input
  ): Promise<string> {
    return JSON.stringify(await this.getUserPreferences.execute(input));
  }
}
