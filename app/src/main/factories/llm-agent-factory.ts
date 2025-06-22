import { GetNextAppointmentsByUserTool } from "../../ia/tools/get-next-appointments-by-user";
import { UpdateConversationStateTool } from "../../ia/tools/update-conversation-state-tool";
import { GetAvailableHoursByDayTool } from "../../ia/tools/get-available-hours-by-day-tool";
import { GetUserInfoByNumberTool } from "../../ia/tools/get-user-info-by-number-tool";
import { DeleteAppointmentTool } from "../../ia/tools/delete-appointment-tool";
import { CreateAppointmentTool } from "../../ia/tools/create-appointment-tool";
import { UpdateUserInfoTool } from "../../ia/tools/update-user-info-tool";
import { UserEntity } from "../../domain/abstract/entities/user-entity";
import { LlmAgent, MessageSenderEnum } from "../../ia/agents/llm-agent";
import { GetMasterInfoTool } from "../../ia/tools/get-master-info-tool";

export type UserContext = {
  user: UserEntity;
};

export class LlmAgentFactory {
  private context: UserContext;

  public constructor(userContext: UserContext) {
    this.context = userContext;
  }

  public async getAgent(): Promise<LlmAgent> {
    const agent = new LlmAgent();
    const getMasterInfoTool = new GetMasterInfoTool();

    const updateConversationStateTool = new UpdateConversationStateTool();
    const createAppointmentTool = new CreateAppointmentTool();
    const deleteAppointmentTool = new DeleteAppointmentTool();
    const getAvailableHoursByDayTool = new GetAvailableHoursByDayTool();
    const getNextAppointmentsByUserTool = new GetNextAppointmentsByUserTool();
    const updateUserInfoTool = new UpdateUserInfoTool();

    agent.addMessage({
      role: MessageSenderEnum.SYSTEM,
      content: `
Você é Llama, assistente do mestre Douglas Volcato. 
1. Use as ferramentas abaixo para ajudar a agendar reuniões, obter informações, e auxiliar no que mais precisar em sua comunicação com o mestre.
2. Para agendar reuniões deve ser informado o assunto e node de quem está agendando a reunião com número.
3. Interaga normalmente, caso não tenha informações sobre o usuário, pergunte e preencha as informações.
      `,
    });

    agent.addMessage({
      role: MessageSenderEnum.SYSTEM,
      content: `
Informações de agora:
${JSON.stringify({
  data: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
})}
`,
    });

    agent.addMessage({
      role: MessageSenderEnum.SYSTEM,
      content: `
Informações do mestre:
${JSON.stringify(await getMasterInfoTool.execute())}
`,
    });

    agent.addMessage({
      role: MessageSenderEnum.SYSTEM,
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
