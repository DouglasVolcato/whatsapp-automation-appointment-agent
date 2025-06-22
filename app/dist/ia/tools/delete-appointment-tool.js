"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAppointmentTool = void 0;
const delete_appointment_usecase_1 = require("../../domain/usecases/appointments/delete-appointment-usecase");
const llm_tool_1 = require("../abstract/classes/llm-tool");
const zod_1 = require("zod");
class DeleteAppointmentTool extends llm_tool_1.LlmTool {
    constructor() {
        super();
        this.deleteAppointmentUseCase = new delete_appointment_usecase_1.DeleteAppointmentUseCase.Service();
    }
    getInstance() {
        return {
            callback: this.execute.bind(this),
            name: "apagar-reuniao",
            schema: zod_1.z.object({
                appointment_id: zod_1.z.string(),
            }),
            description: `Apaga uma reunião já agendada`,
        };
    }
    async execute(input) {
        const response = await this.deleteAppointmentUseCase.execute(input);
        return JSON.stringify(response);
    }
}
exports.DeleteAppointmentTool = DeleteAppointmentTool;
