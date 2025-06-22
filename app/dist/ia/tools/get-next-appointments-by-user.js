"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNextAppointmentsByUserTool = void 0;
const get_next_appointments_by_user_usecase_1 = require("../../domain/usecases/appointments/get-next-appointments-by-user-usecase");
const llm_tool_1 = require("../abstract/classes/llm-tool");
const zod_1 = require("zod");
class GetNextAppointmentsByUserTool extends llm_tool_1.LlmTool {
    constructor() {
        super();
        this.getNextAppointmentsByUserUseCase =
            new get_next_appointments_by_user_usecase_1.GetNextAppointmentsByUserUseCase.Service();
    }
    getInstance() {
        return {
            callback: this.execute.bind(this),
            name: "buscar-proximas-reunioes-do-usuario",
            schema: zod_1.z.object({
                user_id: zod_1.z.string(),
            }),
            description: `Busca as próximas reuniões do usuário com o mestre`,
        };
    }
    async execute(input) {
        return JSON.stringify(await this.getNextAppointmentsByUserUseCase.execute(input));
    }
}
exports.GetNextAppointmentsByUserTool = GetNextAppointmentsByUserTool;
