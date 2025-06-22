"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlmAgentFactory = void 0;
const get_next_appointments_by_user_1 = require("../../ia/tools/get-next-appointments-by-user");
const update_conversation_state_tool_1 = require("../../ia/tools/update-conversation-state-tool");
const get_available_hours_by_day_tool_1 = require("../../ia/tools/get-available-hours-by-day-tool");
const delete_appointment_tool_1 = require("../../ia/tools/delete-appointment-tool");
const create_appointment_tool_1 = require("../../ia/tools/create-appointment-tool");
const update_user_info_tool_1 = require("../../ia/tools/update-user-info-tool");
const llm_agent_1 = require("../../ia/agents/llm-agent");
const get_master_info_tool_1 = require("../../ia/tools/get-master-info-tool");
class LlmAgentFactory {
    constructor(userContext) {
        this.context = userContext;
    }
    async getAgent() {
        const agent = new llm_agent_1.LlmAgent();
        const getMasterInfoTool = new get_master_info_tool_1.GetMasterInfoTool();
        const updateConversationStateTool = new update_conversation_state_tool_1.UpdateConversationStateTool();
        const createAppointmentTool = new create_appointment_tool_1.CreateAppointmentTool();
        const deleteAppointmentTool = new delete_appointment_tool_1.DeleteAppointmentTool();
        const getAvailableHoursByDayTool = new get_available_hours_by_day_tool_1.GetAvailableHoursByDayTool();
        const getNextAppointmentsByUserTool = new get_next_appointments_by_user_1.GetNextAppointmentsByUserTool();
        const updateUserInfoTool = new update_user_info_tool_1.UpdateUserInfoTool();
        agent.addMessage({
            role: llm_agent_1.MessageSenderEnum.SYSTEM,
            content: `
Você é Llama, assistente do mestre Douglas Volcato. 
1. Use as ferramentas abaixo para ajudar a agendar reuniões, obter informações, e auxiliar no que mais precisar em sua comunicação com o mestre.
2. Para agendar reuniões deve ser informado o assunto e node de quem está agendando a reunião com número.
3. Interaga normalmente, caso não tenha informações sobre o usuário, pergunte e preencha as informações.
      `,
        });
        agent.addMessage({
            role: llm_agent_1.MessageSenderEnum.SYSTEM,
            content: `
Informações de agora:
${JSON.stringify({
                data: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
            })}
`,
        });
        agent.addMessage({
            role: llm_agent_1.MessageSenderEnum.SYSTEM,
            content: `
Informações do mestre:
${JSON.stringify(await getMasterInfoTool.execute())}
`,
        });
        agent.addMessage({
            role: llm_agent_1.MessageSenderEnum.SYSTEM,
            content: `
Informações do usuário:
${JSON.stringify(this.context.user || {})}
`,
        });
        agent.addTool(updateConversationStateTool.getInstance());
        agent.addTool(createAppointmentTool.getInstance());
        agent.addTool(deleteAppointmentTool.getInstance());
        agent.addTool(getAvailableHoursByDayTool.getInstance());
        agent.addTool(getNextAppointmentsByUserTool.getInstance());
        agent.addTool(updateUserInfoTool.getInstance());
        return agent;
    }
}
exports.LlmAgentFactory = LlmAgentFactory;
