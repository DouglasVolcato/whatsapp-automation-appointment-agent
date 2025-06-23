import { CreateAppointmentUseCase } from "../../domain/usecases/appointments/create-appointment-usecase";
import { LlmToolType } from "../../domain/abstract/types/llm-tool-type";
import { LlmTool } from "../abstract/classes/llm-tool";
import { z } from "zod";

export class CreateAppointmentTool extends LlmTool {
  protected readonly createAppointmentUseCase: CreateAppointmentUseCase.Service;

  public constructor() {
    super();
    this.createAppointmentUseCase = new CreateAppointmentUseCase.Service();
  }

  public getInstance(): LlmToolType {
    return {
      callback: this.execute.bind(this),
      name: "criar-reuniao",
      schema: z.object({
        user_id: z.string(),
        date_time: z.string(),
        title: z.string(),
        description: z.string(),
      }),
      description: `Cria uma nova reunião do usuário com o mestre. date_time deve ser no formato 'YYYY-MM-DD HH:mm'. Certifique-se de colocar informações sobre o usuário que agendou a reunião.`,
    };
  }

  protected async execute(
    input: typeof CreateAppointmentUseCase.Input
  ): Promise<string> {
    const response: typeof CreateAppointmentUseCase.Output | Error =
      await this.createAppointmentUseCase.execute(
        input as typeof CreateAppointmentUseCase.Input
      );
    if (response instanceof Error) {
      return JSON.stringify({ error: response.message });
    }
    return JSON.stringify(response);
  }
}
