"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentTool = void 0;
const create_appointment_usecase_1 = require("../../domain/usecases/appointments/create-appointment-usecase");
const llm_tool_1 = require("../abstract/classes/llm-tool");
const zod_1 = require("zod");
class CreateAppointmentTool extends llm_tool_1.LlmTool {
    constructor() {
        super();
        this.createAppointmentUseCase = new create_appointment_usecase_1.CreateAppointmentUseCase.Service();
    }
    getInstance() {
        return {
            callback: this.execute.bind(this),
            name: "criar-reuniao",
            schema: zod_1.z.object({
                user_id: zod_1.z.string(),
                date_time: zod_1.z.string(),
                title: zod_1.z.string(),
                description: zod_1.z.string(),
            }),
            description: `Cria uma nova reunião do usuário com o mestre. date_time deve ser no formato 'YYYY-MM-DD HH:mm'. Certifique-se de colocar informações sobre o usuário que agendou a reunião.`,
        };
    }
    async execute(input) {
        const response = await this.createAppointmentUseCase.execute(input);
        if (response instanceof Error) {
            return JSON.stringify({ error: response.message });
        }
        return JSON.stringify(response);
    }
}
exports.CreateAppointmentTool = CreateAppointmentTool;
