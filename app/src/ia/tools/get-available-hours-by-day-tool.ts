import { GetAvailableHoursByDayUseCase } from "../../domain/usecases/appointments/get-available-hours-by-day-usecase";
import { LlmToolType } from "../../domain/abstract/types/llm-tool-type";
import { LlmTool } from "../abstract/classes/llm-tool";
import { z } from "zod";

export class GetAvailableHoursByDayTool extends LlmTool {
  protected readonly GetAvailableHoursByDayUseCase: GetAvailableHoursByDayUseCase.Service;

  public constructor() {
    super();
    this.GetAvailableHoursByDayUseCase =
      new GetAvailableHoursByDayUseCase.Service();
  }

  public getInstance(): LlmToolType {
    return {
      callback: this.execute.bind(this),
      name: "buscar-horarios-disponiveis",
      schema: z.object({
        day: z.string(),
      }),
      description: `Busca os horários disponíveis para o dia informado no formato 'YYYY-MM-DD'`,
    };
  }

  protected async execute(
    input: typeof GetAvailableHoursByDayUseCase.Input
  ): Promise<string> {
    return JSON.stringify(
      await this.GetAvailableHoursByDayUseCase.execute(
        input as typeof GetAvailableHoursByDayUseCase.Input
      )
    );
  }
}
