import { LlmToolType } from "../../domain/abstract/types/llm-tool-type";
import { DynamicStructuredTool, tool } from "@langchain/core/tools";
import { ChatOpenAI } from "@langchain/openai";
import { ChatOllama } from "@langchain/ollama";
import { Env } from "../../main/utils/env";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
  ToolMessage,
} from "@langchain/core/messages";

export enum MessageSenderEnum {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system",
}

type LlmMessageType = {
  role: MessageSenderEnum;
  content: string;
};

type MessageOutput = {
  response: string;
  toolCalls: { name: string; input: any }[];
};

export class LlmAgent {
  private readonly llm: ChatOllama | ChatOpenAI;
  private tools: DynamicStructuredTool[] = [];
  private messages: (HumanMessage | AIMessage | SystemMessage | ToolMessage)[] =
    [];

  public constructor() {
    switch (Env.USE_OPENAI) {
      case true:
        this.llm = new ChatOpenAI({ 
          openAIApiKey: Env.OPENAI_KEY, 
          model: Env.OPENAI_MODEL 
        });
        break;
      default:
        this.llm = new ChatOllama({ model: Env.OLLAMA_MODEL });
        break;
    }
  }

  public addTool(input: LlmToolType) {
    this.tools.push(
      tool(input.callback, {
        name: input.name,
        schema: input.schema,
        description: input.description,
      })
    );
  }

  public addMessage(message: LlmMessageType) {
    if (message.role === MessageSenderEnum.USER) {
      this.messages.push(new HumanMessage(message.content));
    } else if (message.role === MessageSenderEnum.SYSTEM) {
      this.messages.push(new SystemMessage(message.content));
    } else {
      this.messages.push(new AIMessage(message.content));
    }
  }

  public async getResponse(): Promise<MessageOutput> {
    // console.log("this.messages", this.messages);
    const llmWithTools = this.llm.bindTools(this.tools);

    let response = await llmWithTools.invoke(this.messages);
    this.messages.push(response);

    if (response.tool_calls && response.tool_calls.length > 0) {
      let toolMessage: string | null = null;
      // console.log("response.tool_calls", response.tool_calls);
      for (const call of response.tool_calls) {
        const selected = this.tools.find((t) => t.name === call.name)!;
        let result = "";
        try {
          result = await selected.invoke(call.args);
          toolMessage = this.getToolMessage(result);
        } catch (error: any) {
          result = JSON.stringify({ error: error.message });
        }
        const content =
          typeof result === "string" ? result : JSON.stringify(result);
        this.messages.push(
          new ToolMessage({
            name: call.name,
            content,
            tool_call_id: call.id || "",
          })
        );
      }

      this.messages.push(
        new SystemMessage(
          `Use apenas essas informações para formular sua resposta final ao usuário, sem chamar mais ferramentas.
           **ATENÇÃO**: Sua resposta **nunca** pode ficar em branco.`
        )
      );

      if (toolMessage) {
        return {
          response: toolMessage,
          toolCalls: response.tool_calls.map((c) => ({
            name: c.name,
            input: c.args,
          })),
        };
      }

      response = await llmWithTools.invoke(this.messages);
      this.messages.push(response);
    }

    let text = this.formatLlmResponse(response.text);
    if (!text || text.trim() === "") {
      text =
        "Desculpe, não consegui gerar uma resposta adequada. Você poderia reformular ou dar mais detalhes, por favor?";
    }

    const toolCalls =
      response.tool_calls?.map((c) => ({ name: c.name, input: c.args })) || [];
    return { response: text, toolCalls };
  }

  private getToolMessage(result: string): string | null {
    try {
      const toolMessage = JSON.parse(result);
      if (
        "return_message" in toolMessage &&
        typeof toolMessage.return_message === "string" &&
        toolMessage.return_message.length > 0
      ) {
        return toolMessage.return_message;
      }
    } catch (error) { }

    return null;
  }

  private formatLlmResponse(response: string) {
    const parts = response.split("</think>");
    return parts.length > 1 ? parts[1].trim() : response.trim();
  }
}
