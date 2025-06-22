"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAvailableHoursByDayTool = void 0;
const get_available_hours_by_day_usecase_1 = require("../../domain/usecases/appointments/get-available-hours-by-day-usecase");
const llm_tool_1 = require("../abstract/classes/llm-tool");
const zod_1 = require("zod");
class GetAvailableHoursByDayTool extends llm_tool_1.LlmTool {
    constructor() {
        super();
        this.GetAvailableHoursByDayUseCase =
            new get_available_hours_by_day_usecase_1.GetAvailableHoursByDayUseCase.Service();
    }
    getInstance() {
        return {
            callback: this.execute.bind(this),
            name: "buscar-horarios-disponiveis",
            schema: zod_1.z.object({
                day: zod_1.z.string(),
            }),
            description: `Busca os horários disponíveis para o dia informado no formato 'YYYY-MM-DD'`,
        };
    }
    async execute(input) {
        return JSON.stringify(await this.GetAvailableHoursByDayUseCase.execute(input));
    }
}
exports.GetAvailableHoursByDayTool = GetAvailableHoursByDayTool;
