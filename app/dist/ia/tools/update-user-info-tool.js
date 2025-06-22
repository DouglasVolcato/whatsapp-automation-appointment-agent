"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserInfoTool = void 0;
const get_user_by_id_usecase_1 = require("../../domain/usecases/users/get-user-by-id-usecase");
const update_user_usecase_1 = require("../../domain/usecases/users/update-user-usecase");
const llm_tool_1 = require("../abstract/classes/llm-tool");
const zod_1 = require("zod");
class UpdateUserInfoTool extends llm_tool_1.LlmTool {
    constructor() {
        super();
        this.preferences = {
            name: "Nome",
            email: "Email",
            phone: "Telefone",
            relation_with_master: "Relação com o mestre",
            what_likes: "Oque gosta",
            what_knows: "Oque sabe",
            what_does: "Oque faz",
        };
        this.updateUserInfoUseCase = new update_user_usecase_1.UpdateUserUseCase.Service();
        this.getUserInfoUseCase = new get_user_by_id_usecase_1.GetUserByIdUseCase.Service();
    }
    getInstance() {
        return {
            callback: this.execute.bind(this),
            name: "atualizar-informacoes-do-usuario",
            schema: zod_1.z.object({
                id: zod_1.z.string(),
                name: zod_1.z.string().optional(),
                email: zod_1.z.string().optional(),
                phone: zod_1.z.string().optional(),
                relation_with_master: zod_1.z.string().optional(),
                what_likes: zod_1.z.string().optional(),
                what_knows: zod_1.z.string().optional(),
                what_does: zod_1.z.string().optional(),
            }),
            description: `Atualiza as informações do usuário. 'relation_with_master', 'what_likes', 'what_knows' e 'what_does' são campos opcionais e livres`,
        };
    }
    async execute(input) {
        await this.updateUserInfoUseCase.execute(input);
        const preferences = await this.getUserInfoUseCase.execute({
            id: input.id,
        });
        const filledPreferences = [];
        const notFilledPreferences = [];
        for (const [key, value] of Object.entries(preferences)) {
            if (value && value !== "" && value !== "0") {
                filledPreferences.push(key);
            }
            else {
                notFilledPreferences.push(key);
            }
        }
        let notFilledPreferencesToShow = "";
        for (const preference of notFilledPreferences) {
            if (preference in this.preferences) {
                notFilledPreferencesToShow += `- ${this.preferences[preference]}\n`;
            }
        }
        const userData = await this.getUserInfoUseCase.execute({
            id: input.id,
        });
        return JSON.stringify({ userData, notFilledPreferencesToShow });
    }
}
exports.UpdateUserInfoTool = UpdateUserInfoTool;
