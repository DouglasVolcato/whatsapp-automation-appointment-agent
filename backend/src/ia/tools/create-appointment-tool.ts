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
        when: z.string(),
        title: z.string(),
        description: z.string(),
      }),
      description: `Cria uma nova reunião`,
    };
  }

  protected async execute(
    input: typeof CreateAppointmentUseCase.Input
  ): Promise<string> {
    const response: typeof CreateAppointmentUseCase.Output =
      await this.createAppointmentUseCase.execute(
        input as typeof CreateAppointmentUseCase.Input
      );
    return JSON.stringify(response);
  }
}
