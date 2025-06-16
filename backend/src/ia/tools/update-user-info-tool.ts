import { GetUserByIdUseCase } from "../../domain/usecases/users/get-user-by-id-usecase";
import { UpdateUserUseCase } from "../../domain/usecases/users/update-user-usecase";
import { LlmToolType } from "../../domain/abstract/types/llm-tool-type";
import { LlmTool } from "../abstract/classes/llm-tool";
import { z } from "zod";

type InfoIndexType =
  | "name"
  | "email"
  | "phone"
  | "relation_with_master"
  | "what_likes"
  | "what_knows"
  | "what_does";

export class UpdateUserInfoTool extends LlmTool {
  protected readonly updateUserInfoUseCase: UpdateUserUseCase.Service;
  protected readonly getUserInfoUseCase: GetUserByIdUseCase.Service;

  protected readonly preferences = {
    name: "Nome",
    email: "Email",
    phone: "Telefone",
    relation_with_master: "Relação com o mestre",
    what_likes: "Oque gosta",
    what_knows: "Oque sabe",
    what_does: "Oque faz",
  };

  public constructor() {
    super();
    this.updateUserInfoUseCase = new UpdateUserUseCase.Service();
    this.getUserInfoUseCase = new GetUserByIdUseCase.Service();
  }

  public getInstance(): LlmToolType {
    return {
      callback: this.execute.bind(this),
      name: "atualizar-informacoes-do-usuario",
      schema: z.object({
        id: z.string(),
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        relation_with_master: z.string().optional(),
        what_likes: z.string().optional(),
        what_knows: z.string().optional(),
        what_does: z.string().optional(),
      }),
      description: `Atualiza as informações do usuário`,
    };
  }

  protected async execute(
    input: typeof UpdateUserUseCase.Input
  ): Promise<string> {
    await this.updateUserInfoUseCase.execute(
      input as typeof UpdateUserUseCase.Input
    );
    const preferences: typeof GetUserByIdUseCase.Output =
      await this.getUserInfoUseCase.execute({
        id: input.id,
      } as typeof GetUserByIdUseCase.Input);

    const filledPreferences: InfoIndexType[] = [];
    const notFilledPreferences: InfoIndexType[] = [];

    for (const [key, value] of Object.entries(preferences)) {
      if (value && value !== "" && value !== "0") {
        filledPreferences.push(key as InfoIndexType);
      } else {
        notFilledPreferences.push(key as InfoIndexType);
      }
    }

    let notFilledPreferencesToShow = "";

    for (const preference of notFilledPreferences) {
      if (preference in this.preferences) {
        notFilledPreferencesToShow += `- ${this.preferences[preference]}\n`;
      }
    }

    const userData: typeof GetUserByIdUseCase.Output | Error =
      await this.getUserInfoUseCase.execute({
        id: input.id,
      } as typeof GetUserByIdUseCase.Input);

    return JSON.stringify({ userData, notFilledPreferencesToShow });
  }
}
