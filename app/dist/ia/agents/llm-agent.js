"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlmAgent = exports.MessageSenderEnum = void 0;
const tools_1 = require("@langchain/core/tools");
const openai_1 = require("@langchain/openai");
const ollama_1 = require("@langchain/ollama");
const env_1 = require("../../main/utils/env");
const messages_1 = require("@langchain/core/messages");
var MessageSenderEnum;
(function (MessageSenderEnum) {
    MessageSenderEnum["USER"] = "user";
    MessageSenderEnum["ASSISTANT"] = "assistant";
    MessageSenderEnum["SYSTEM"] = "system";
})(MessageSenderEnum || (exports.MessageSenderEnum = MessageSenderEnum = {}));
class LlmAgent {
    constructor() {
        this.tools = [];
        this.messages = [];
        switch (env_1.Env.USE_OPENAI) {
            case true:
                this.llm = new openai_1.ChatOpenAI({
                    openAIApiKey: env_1.Env.OPENAI_KEY,
                    model: env_1.Env.OPENAI_MODEL
                });
                break;
            default:
                this.llm = new ollama_1.ChatOllama({ model: env_1.Env.OLLAMA_MODEL });
                break;
        }
    }
    addTool(input) {
        this.tools.push((0, tools_1.tool)(input.callback, {
            name: input.name,
            schema: input.schema,
            description: input.description,
        }));
    }
    addMessage(message) {
        if (message.role === MessageSenderEnum.USER) {
            this.messages.push(new messages_1.HumanMessage(message.content));
        }
        else if (message.role === MessageSenderEnum.SYSTEM) {
            this.messages.push(new messages_1.SystemMessage(message.content));
        }
        else {
            this.messages.push(new messages_1.AIMessage(message.content));
        }
    }
    async getResponse() {
        // console.log("this.messages", this.messages);
        const llmWithTools = this.llm.bindTools(this.tools);
        let response = await llmWithTools.invoke(this.messages);
        this.messages.push(response);
        if (response.tool_calls && response.tool_calls.length > 0) {
            let toolMessage = null;
            // console.log("response.tool_calls", response.tool_calls);
            for (const call of response.tool_calls) {
                const selected = this.tools.find((t) => t.name === call.name);
                let result = "";
                try {
                    result = await selected.invoke(call.args);
                    toolMessage = this.getToolMessage(result);
                }
                catch (error) {
                    result = JSON.stringify({ error: error.message });
                }
                const content = typeof result === "string" ? result : JSON.stringify(result);
                this.messages.push(new messages_1.ToolMessage({
                    name: call.name,
                    content,
                    tool_call_id: call.id || "",
                }));
            }
            this.messages.push(new messages_1.SystemMessage(`Use apenas essas informações para formular sua resposta final ao usuário, sem chamar mais ferramentas.
           **ATENÇÃO**: Sua resposta **nunca** pode ficar em branco.`));
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
        const toolCalls = response.tool_calls?.map((c) => ({ name: c.name, input: c.args })) || [];
        return { response: text, toolCalls };
    }
    getToolMessage(result) {
        try {
            const toolMessage = JSON.parse(result);
            if ("return_message" in toolMessage &&
                typeof toolMessage.return_message === "string" &&
                toolMessage.return_message.length > 0) {
                return toolMessage.return_message;
            }
        }
        catch (error) { }
        return null;
    }
    formatLlmResponse(response) {
        const parts = response.split("</think>");
        return parts.length > 1 ? parts[1].trim() : response.trim();
    }
}
exports.LlmAgent = LlmAgent;
