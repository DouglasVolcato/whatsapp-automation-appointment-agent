import { GetNextAppointmentsByUserUseCase } from "../../domain/usecases/appointments/get-next-appointments-by-user-usecase";
import { LlmToolType } from "../../domain/abstract/types/llm-tool-type";
import { LlmTool } from "../abstract/classes/llm-tool";
import { z } from "zod";

export class GetNextAppointmentsByUserTool extends LlmTool {
  protected readonly getNextAppointmentsByUserUseCase: GetNextAppointmentsByUserUseCase.Service;

  public constructor() {
    super();
    this.getNextAppointmentsByUserUseCase =
      new GetNextAppointmentsByUserUseCase.Service();
  }

  public getInstance(): LlmToolType {
    return {
      callback: this.execute.bind(this),
      name: "buscar-proximas-reunioes-do-usuario",
      schema: z.object({
        user_id: z.string(),
      }),
      description: `Busca as próximas reuniões do usuário com o mestre`,
    };
  }

  protected async execute(
    input: typeof GetNextAppointmentsByUserUseCase.Input
  ): Promise<string> {
    return JSON.stringify(
      await this.getNextAppointmentsByUserUseCase.execute(
        input as typeof GetNextAppointmentsByUserUseCase.Input
      )
    );
  }
}
