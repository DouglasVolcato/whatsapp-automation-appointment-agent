import { GetUserByNumberUseCase } from "../../domain/usecases/users/get-user-by-number-usecase";
import { LlmToolType } from "../../domain/abstract/types/llm-tool-type";
import { LlmTool } from "../abstract/classes/llm-tool";
import { z } from "zod";

export class GetUserByNumberTool extends LlmTool {
  private readonly getUserByNumber: GetUserByNumberUseCase.Service;

  public constructor() {
    super();
    this.getUserByNumber = new GetUserByNumberUseCase.Service();
  }

  public getInstance(): LlmToolType {
    return {
      callback: this.execute.bind(this),
      name: "busca-usuario-pelo-telefone",
      schema: z.object({
        number: z.string(),
      }),
      description: "Busca informações do usuário pelo telefone",
    };
  }

  private async execute(
    input: typeof GetUserByNumberUseCase.Input
  ): Promise<string> {
    return JSON.stringify(await this.getUserByNumber.execute(input));
  }
}
