"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConversationStateTool = void 0;
const get_user_by_id_usecase_1 = require("../../domain/usecases/users/get-user-by-id-usecase");
const update_user_usecase_1 = require("../../domain/usecases/users/update-user-usecase");
const llm_tool_1 = require("../abstract/classes/llm-tool");
const zod_1 = require("zod");
class UpdateConversationStateTool extends llm_tool_1.LlmTool {
    constructor() {
        super();
        this.updateUserInfoUseCase = new update_user_usecase_1.UpdateUserUseCase.Service();
        this.getUserInfoUseCase = new get_user_by_id_usecase_1.GetUserByIdUseCase.Service();
    }
    getInstance() {
        return {
            callback: this.execute.bind(this),
            name: "atualizar-estado-da-conversa",
            schema: zod_1.z.object({
                id: zod_1.z.string(),
                conversation_state: zod_1.z.string().optional(),
            }),
            description: `Atualiza o estado da conversa. Ele pode ser "Pegando informações", "Agendando reunião" ou "Conversando"`,
        };
    }
    async execute(input) {
        const response = await this.updateUserInfoUseCase.execute(input);
        return JSON.stringify(response);
    }
}
exports.UpdateConversationStateTool = UpdateConversationStateTool;
