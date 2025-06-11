import { UpdateUserNotificationPreferencesUseCase } from "../../domain/usecases/users/update-user-notification-preferences-usecase";
import { LlmToolType } from "../../domain/abstract/types/llm-tool-type";
import { LlmTool } from "../abstract/classes/llm-tool";
import { z } from "zod";

export class UpdateUserNotificationPreferencesTool extends LlmTool {
  private readonly updateUserNotificationPreferences: UpdateUserNotificationPreferencesUseCase.Service;

  public constructor() {
    super();
    this.updateUserNotificationPreferences = new UpdateUserNotificationPreferencesUseCase.Service();
  }

  public getInstance(): LlmToolType {
    return {
      callback: this.execute.bind(this),
      name: "atualizar-preferencias-notificacoes",
      schema: z.object({
        user_id: z.string(),
        receive_notifications: z.boolean(),
      }),
      description: `Atualiza as preferências do usuário relacionadas a receber notificações de novos imóveis.`,
    };
  }

  private async execute(
    input: typeof UpdateUserNotificationPreferencesUseCase.Input
  ): Promise<string> {
    const response: typeof UpdateUserNotificationPreferencesUseCase.Output = await this.updateUserNotificationPreferences.execute(input);
    if (response instanceof Error) {
      return `Erro ao atualizar preferências: ${response.message}`;
    }
    return response.message;
  }
}
