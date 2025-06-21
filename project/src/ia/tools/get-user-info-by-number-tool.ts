import { GetUserByNumberUseCase } from "../../domain/usecases/users/get-user-by-number-usecase";
import { LlmToolType } from "../../domain/abstract/types/llm-tool-type";
import { LlmTool } from "../abstract/classes/llm-tool";
import { z } from "zod";

export class GetUserInfoByNumberTool extends LlmTool {
  protected readonly getUserInfoUseCase: GetUserByNumberUseCase.Service;

  public constructor() {
    super();
    this.getUserInfoUseCase = new GetUserByNumberUseCase.Service();
  }

  public getInstance(): LlmToolType {
    return {
      callback: this.execute.bind(this),
      name: "buscar-informacoes-do-usuario-pelo-telefone",
      schema: z.object({
        number: z.string(),
      }),
      description: `Busca as informações do usuário pelo telefone`,
    };
  }

  protected async execute(
    input: typeof GetUserByNumberUseCase.Input
  ): Promise<string> {
    return JSON.stringify(
      await this.getUserInfoUseCase.execute(
        input as typeof GetUserByNumberUseCase.Input
      )
    );
  }
}
