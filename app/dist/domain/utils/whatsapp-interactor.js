"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappInteractor = void 0;
const llm_agent_1 = require("../../ia/agents/llm-agent");
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
class WhatsappInteractor {
    constructor() {
        if (!WhatsappInteractor.client) {
            WhatsappInteractor.client = new whatsapp_web_js_1.Client({
                authStrategy: new whatsapp_web_js_1.LocalAuth(),
                puppeteer: {
                    args: ["--no-sandbox", "--disable-setuid-sandbox"],
                },
            });
        }
    }
    async observeMessages(app, onMessage) {
        WhatsappInteractor.client.on("qr", (qr) => {
            console.log("📲 Scan this code:");
            qrcode_terminal_1.default.generate(qr, { small: true });
        });
        WhatsappInteractor.client.on("ready", () => {
            console.log("✅ Client is ready!");
            this.notifyDeveloper("Whatsapp client is ready");
        });
        WhatsappInteractor.client.on("message", async (message) => {
            try {
                const msg = message;
                const chat = await message.getChat();
                const msgs = await chat.fetchMessages({
                    limit: 5,
                });
                const contact = await msg.getContact();
                const chatContext = msgs
                    .filter((message) => message.body.trim() != "")
                    .map((message) => ({
                    sender: message.fromMe
                        ? llm_agent_1.MessageSenderEnum.ASSISTANT
                        : llm_agent_1.MessageSenderEnum.USER,
                    content: message.body,
                }));
                if (!chat.isGroup) {
                    chat.sendSeen();
                    chat.sendStateTyping();
                    const response = await onMessage({
                        number: contact.number,
                        lastMessages: chatContext,
                    });
                    if (response) {
                        await msg.reply(response);
                        await chat.markUnread();
                    }
                }
            }
            catch (error) {
                this.notifyDeveloper(error.message);
            }
        });
        WhatsappInteractor.client.initialize();
    }
    async sendMessageToNumber(input) {
        await WhatsappInteractor.client.sendMessage(input.number, input.message);
    }
    async notifyDeveloper(message) {
        const time = new Date().toISOString().split(".")[0].replace("T", " ");
        WhatsappInteractor.client.sendMessage("555199772868@c.us", `API Automação: ${time} - ${message}`, {
            linkPreview: false,
        });
    }
}
exports.WhatsappInteractor = WhatsappInteractor;
