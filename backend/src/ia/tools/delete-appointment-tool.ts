import { DeleteAppointmentUseCase } from "../../domain/usecases/appointments/delete-appointment-usecase";
import { LlmToolType } from "../../domain/abstract/types/llm-tool-type";
import { LlmTool } from "../abstract/classes/llm-tool";
import { z } from "zod";

export class DeleteAppointmentTool extends LlmTool {
  protected readonly deleteAppointmentUseCase: DeleteAppointmentUseCase.Service;

  public constructor() {
    super();
    this.deleteAppointmentUseCase = new DeleteAppointmentUseCase.Service();
  }

  public getInstance(): LlmToolType {
    return {
      callback: this.execute.bind(this),
      name: "apagar-reuniao",
      schema: z.object({
        appointment_id: z.string(),
      }),
      description: `Apaga uma reunião já agendada`,
    };
  }

  protected async execute(
    input: typeof DeleteAppointmentUseCase.Input
  ): Promise<string> {
    const response: typeof DeleteAppointmentUseCase.Output =
      await this.deleteAppointmentUseCase.execute(
        input as typeof DeleteAppointmentUseCase.Input
      );
    return JSON.stringify(response);
  }
}
