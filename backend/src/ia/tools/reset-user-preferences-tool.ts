import { UpdateUserPreferencesUseCase } from "../../domain/usecases/users/update-user-preferences-usecase";
import { UpdateUserPreferencesTool } from "./update-user-preferences-tool";
import { LlmToolType } from "../../domain/abstract/types/llm-tool-type";
import { z } from "zod"

export class ResetUserPreferencesTool extends UpdateUserPreferencesTool {
  public constructor() {
    super();
  }

  public getInstance(): LlmToolType {
    return {
      callback: this.handle.bind(this),
      name: "atualizar-preferencias",
      schema: z.object({
        user_id: z.string(),
        country: z.string().optional(),
        state: z.string().optional(),
        city: z.string().optional(),
        neighborhood: z.string().optional(),
        bathrooms: z.string().optional(),
        bedrooms: z.string().optional(),
        parking_spaces: z.string().optional(),
        price_from: z.string().optional(),
        price_to: z.string().optional(),
        size: z.string().optional(),
        property_type: z.string().optional(),
        condition_type: z.string().optional(),
      }),
      description: `Reseta as preferências do usuário relacionadas a propriedades. 
        Podem ser passados parâmetros opcionais para atualizar as preferências durante o reset.
        property_type pode ser um desses valores ['Casa', 'Apartamento', 'Terreno', 'Escritório', 'Loja'].
        condition_type pode ser um desses valores ['Comprar', 'Alugar'].`,
    };
  }

  private async handle(
    input: typeof UpdateUserPreferencesUseCase.Input
  ): Promise<string> {
    return await this.execute({ ...input, reset: true });
  }
}
