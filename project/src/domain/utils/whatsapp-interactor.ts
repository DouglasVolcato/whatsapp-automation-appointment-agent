import { MessageSenderEnum } from "../../ia/agents/llm-agent";
import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

export type ChatMessage = {
  sender: MessageSenderEnum;
  content: string;
};

type SendMessageResponseCallback = (input: {
  number: string;
  lastMessages: ChatMessage[];
}) => Promise<string | null>;

export class WhatsappInteractor {
  private static client: Client;

  public constructor() {
    if (!WhatsappInteractor.client) {
      WhatsappInteractor.client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: {
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        },
      });
    }
  }

  public async observeMessages(app: any, onMessage: SendMessageResponseCallback) {
    WhatsappInteractor.client.on("qr", (qr: string) => {
      console.log("📲 Scan this code:");
      qrcode.generate(qr, { small: true });
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
              ? MessageSenderEnum.ASSISTANT
              : MessageSenderEnum.USER,
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
      } catch (error: any) {
        this.notifyDeveloper(error.message);
      }
    });
    WhatsappInteractor.client.initialize();
  }

  public async sendMessageToNumber(input: {
    message: string;
    number: string;
  }): Promise<void> {
    await WhatsappInteractor.client.sendMessage(input.number, input.message);
  }

  public async notifyDeveloper(message: string) {
    const time = new Date().toISOString().split(".")[0].replace("T", " ");
    WhatsappInteractor.client.sendMessage(
      "555199772868@c.us",
      `API Vizinho: ${time} - ${message}`,
      {
        linkPreview: false,
      }
    );
  }
}
