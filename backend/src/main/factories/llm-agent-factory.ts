import { UpdateUserNotificationPreferencesTool } from "../../ia/tools/update-user-notification-preferences-tool";
import { UserConversationPossibleStatus } from "../../domain/abstract/entities/user-conversation-state-entity";
import { UserPreferenceEntity } from "../../domain/abstract/entities/user-preference-entity";
import { UpdateConversationStateTool } from "../../ia/tools/update-conversation-state-tool";
import { UpdateUserPreferencesTool } from "../../ia/tools/update-user-preferences-tool";
import { RemoveUserPreferencesTool } from "../../ia/tools/remove-user-preferences-tool";
import { ResetUserPreferencesTool } from "../../ia/tools/reset-user-preferences-tool";
import { SearchPropertiesTool } from "../../ia/tools/search-properties-tool";
import { UserEntity } from "../../domain/abstract/entities/user-entity";
import { LlmAgent, MessageSenderEnum } from "../../ia/agents/llm-agent";

const updateConversationStateTool = new UpdateConversationStateTool();
const updateUserPreferencesTool = new UpdateUserPreferencesTool();
const searchPropertiesTool = new SearchPropertiesTool();
const updateUserNotificationPreferencesTool = new UpdateUserNotificationPreferencesTool();
const resetUserPreferencesTool = new ResetUserPreferencesTool()
const removeUserPreferencesTool = new RemoveUserPreferencesTool()

export type UserContext = {
  user: UserEntity;
  userPreferences: UserPreferenceEntity;
  conversationState: UserConversationPossibleStatus;
  availablePropertyTypes: string[];
  availableConditionTypes: string[];
};

export class LlmAgentFactory {
  private context: UserContext;

  public constructor(userContext: UserContext) {
    this.context = userContext;
  }

  public getAgent(): LlmAgent {
    switch (this.context.conversationState) {
      case "Apresentação":
        return this.presentationAgent();
      case "Buscando propriedades":
        return this.searchPropertiesAgent();
      case "Propriedade comprada/alugada":
        return this.maintainConversationAgent();
    }
  }

  private presentationAgent(): LlmAgent {
    const agent = new LlmAgent();
    agent.addMessage({
      role: MessageSenderEnum.SYSTEM,
      content: `
Você é o Vizinho, um agente que ajuda a encontrar propriedades para comprar. Suas funcionalidades são: 
1. Buscar propriedades para comprar/alugar de acordo com as preferências do usuário
2. Enviar alertas quando uma nova propriedade com as preferências do usuário entrar no mercado.
Regras para a conversa:
1. Apresente-se e diga suas funcionalidades.
2. Sempre responda em português.
3. Mude o estado da conversa independente do que o usuário disser.
4. Caso o usuário peça algo fora de suas funções avise que não pode responder.
      `,
    });
    agent.addMessage({
      role: MessageSenderEnum.SYSTEM,
      content: `
Preferências do usuário:
${JSON.stringify(this.context.userPreferences || {})}
${JSON.stringify({ receive_notifications: this.context.user.receive_notifications || false })}
Tipos de propriedades disponíveis:
${this.context.availablePropertyTypes.join(", ")}
Tipos de condições disponíveis:
${this.context.availableConditionTypes.join(", ")}
`,
    });
    agent.addTool(updateUserPreferencesTool.getInstance());
    agent.addTool(updateConversationStateTool.getInstance());
    return agent;
  }

  private searchPropertiesAgent(): LlmAgent {
    const agent = new LlmAgent();
    agent.addMessage({
      role: MessageSenderEnum.SYSTEM,
      content: `
Você é o Vizinho, um agente que ajuda a encontrar propriedades para comprar/alugar.
1. Sempre responda em português.
2. Nem todas as preferências são obrigatórias—3 preferências preenchidas já são suficientes para buscar imóiveis.
3. Sempre atualize preferências do usuário sempre que possível.
4. Caso o usuário peça algo fora de suas funções avise que não pode responder.
      `,
    });
    agent.addMessage({
      role: MessageSenderEnum.SYSTEM,
      content: `
Preferências do usuário:
${JSON.stringify(this.context.userPreferences || {})}
${JSON.stringify({ receive_notifications: this.context.user.receive_notifications || false })}
Tipos de propriedades disponíveis:
${this.context.availablePropertyTypes.join(", ")}
Tipos de condições disponíveis:
${this.context.availableConditionTypes.join(", ")}
`,
    });
    agent.addTool(updateUserPreferencesTool.getInstance());
    agent.addTool(removeUserPreferencesTool.getInstance());
    agent.addTool(updateConversationStateTool.getInstance());
    agent.addTool(updateUserNotificationPreferencesTool.getInstance());
    agent.addTool(searchPropertiesTool.getInstance());
    return agent;
  }

  private maintainConversationAgent(): LlmAgent {
    const agent = new LlmAgent();
    agent.addMessage({
      role: MessageSenderEnum.SYSTEM,
      content: `
Você é o Vizinho, um agente que ajuda a encontrar propriedades para comprar/alugar.
1. Sempre responda em português.
2. Nem todas as preferências são obrigatórias—3 preferências preenchidas já são suficientes para buscar imóiveis.
3. Sempre atualize preferências do usuário sempre que possível.
4. Caso o usuário peça algo fora de suas funções avise que não pode responder.
      `,
    });
    agent.addMessage({
      role: MessageSenderEnum.SYSTEM,
      content: `
Preferências do usuário:
${JSON.stringify(this.context.userPreferences || {})}
${JSON.stringify({ receive_notifications: this.context.user.receive_notifications || false })}
Tipos de propriedades disponíveis:
${this.context.availablePropertyTypes.join(", ")}
Tipos de condições disponíveis:
${this.context.availableConditionTypes.join(", ")}
`,
    });
    agent.addTool(updateUserPreferencesTool.getInstance());
    agent.addTool(removeUserPreferencesTool.getInstance());
    agent.addTool(updateConversationStateTool.getInstance());
    agent.addTool(updateUserNotificationPreferencesTool.getInstance());
    agent.addTool(searchPropertiesTool.getInstance());
    return agent;
  }
}
