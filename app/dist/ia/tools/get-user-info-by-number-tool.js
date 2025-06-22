"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserInfoByNumberTool = void 0;
const get_user_by_number_usecase_1 = require("../../domain/usecases/users/get-user-by-number-usecase");
const llm_tool_1 = require("../abstract/classes/llm-tool");
const zod_1 = require("zod");
class GetUserInfoByNumberTool extends llm_tool_1.LlmTool {
    constructor() {
        super();
        this.getUserInfoUseCase = new get_user_by_number_usecase_1.GetUserByNumberUseCase.Service();
    }
    getInstance() {
        return {
            callback: this.execute.bind(this),
            name: "buscar-informacoes-do-usuario-pelo-telefone",
            schema: zod_1.z.object({
                number: zod_1.z.string(),
            }),
            description: `Busca as informações do usuário pelo telefone`,
        };
    }
    async execute(input) {
        return JSON.stringify(await this.getUserInfoUseCase.execute(input));
    }
}
exports.GetUserInfoByNumberTool = GetUserInfoByNumberTool;
