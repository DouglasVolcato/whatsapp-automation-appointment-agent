import { GetUserByIdUseCase } from "../../domain/usecases/users/get-user-by-id-usecase";
import { UpdateUserUseCase } from "../../domain/usecases/users/update-user-usecase";
import { LlmToolType } from "../../domain/abstract/types/llm-tool-type";
import { LlmTool } from "../abstract/classes/llm-tool";
import { z } from "zod";

export class UpdateConversationStateTool extends LlmTool {
    protected readonly updateUserInfoUseCase: UpdateUserUseCase.Service;
    protected readonly getUserInfoUseCase: GetUserByIdUseCase.Service;

    public constructor() {
        super();
        this.updateUserInfoUseCase = new UpdateUserUseCase.Service();
        this.getUserInfoUseCase = new GetUserByIdUseCase.Service();
    }

    public getInstance(): LlmToolType {
        return {
            callback: this.execute.bind(this),
            name: "atualizar-estado-da-conversa",
            schema: z.object({
                id: z.string(),
                conversation_state: z.string().optional(),
            }),
            description: `Atualiza o estado da conversa. Ele pode ser "Pegando informações", "Agendando reunião" ou "Conversando"`,
        };
    }

    protected async execute(
        input: typeof UpdateUserUseCase.Input
    ): Promise<string> {
        const response: typeof UpdateUserUseCase.Output =
            await this.updateUserInfoUseCase.execute(
                input as typeof UpdateUserUseCase.Input
            );
        return JSON.stringify(response);
    }
}
