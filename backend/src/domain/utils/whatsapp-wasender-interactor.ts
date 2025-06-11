import { MessageSenderEnum } from "../../ia/agents/llm-agent";
import { Logger } from "../../domain/utils/logger";
import { Env } from "../../main/utils/env";
import axios from 'axios';

export type ChatMessage = {
  sender: MessageSenderEnum;
  content: string;
};

type SendMessageResponseCallback = (input: {
  number: string;
  lastMessages: ChatMessage[];
}) => Promise<string | null>;

type WasenderReceiveMessage = {
  "event": "messages.upsert",
  "sessionId": "4df2e7482451cc6b56593be9152ca903c761ddae6326e9ede6dc7ffa8d1adfce",
  "data": { "messages": { "messageStubParameters": [], "labels": [], "userReceipt": [], "reactions": [], "pollUpdates": [], "eventResponses": [], "statusMentions": [], "messageAddOns": [], "statusMentionSources": [], "supportAiCitations": [], "key": { "remoteJid": "555199772868@s.whatsapp.net", "fromMe": true, "id": "3EB0B6651F5FF26DFFB607" }, "message": { "extendedTextMessage": { "text": "Olá! Eu sou o Vizinho, seu agente virtual especializado em encontrar propriedades para comprar ou alugar de acordo com suas preferências. Posso ajudar a buscar imóveis que se encaixem no que você procura e também enviar alertas quando uma nova propriedade com seu perfil entrar no mercado. Como posso ajudar você hoje?" } }, "messageTimestamp": { "low": 1749010559, "high": 0, "unsigned": true }, "status": 1, "remoteJid": "555199772868@s.whatsapp.net", "id": "3EB0B6651F5FF26DFFB607" } }, "timestamp": 1749010559431
}

export class WhatsappWasenderInteractor {
  public async observeMessages(app: any, onMessage: SendMessageResponseCallback) {
    app.post('/whatsapp-webhook', (req: any, res: any) => {
      // if (!verifySignature(req)) {
      //     return res.status(401).json({ error: 'Invalid signature' });
      // }

      const payload: WasenderReceiveMessage = req.body;
      Logger.writeLog('logs/whatsapp.txt', JSON.stringify(payload))

      if (payload.event === 'messages.upsert') {
        this.handleMessage(payload, onMessage);
      }

      res.status(200).json({ received: true });
    });
  }

  private async handleMessage(payload: WasenderReceiveMessage | any, onMessage: SendMessageResponseCallback) {
    let message = '';
    let fromMe = false;
    let remoteJid = '';
    try {
      message = payload.data.messages.message.extendedTextMessage.text;
      fromMe = payload.data.messages.key.fromMe;
      remoteJid = payload.data.messages.key.remoteJid;
    } catch (error) {
      message = payload.data.message.conversation;
      fromMe = payload.data.key.fromMe;
      remoteJid = payload.data.key.remoteJid;
    }

    try {
      if (fromMe || !remoteJid) return;

      const contactNumber = remoteJid.split('@')[0];
      const chatContext: ChatMessage[] = [{
        sender: MessageSenderEnum.USER,
        content: message
      }];

      const response = await onMessage({
        number: contactNumber,
        lastMessages: chatContext
      });

      if (response) {
        await this.sendMessageToNumber({
          number: contactNumber,
          message: response
        });
      }
    } catch (error) {
      Logger.error(error)
      Logger.writeLog('logs/whatsapp.txt', `Error handling message: ${error} - Payload: ${JSON.stringify(payload)}`);
    }
  }

  public async sendMessageToNumber(input: {
    message: string;
    number: string;
  }): Promise<void> {
    await axios({
      method: 'POST',
      url: 'https://www.wasenderapi.com/api/send-message',
      headers: {
        'Authorization': `Bearer ${Env.WASENDER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      data: {
        "to": input.number,
        "text": input.message
      }
    });
    Logger.writeLog('logs/whatsapp.txt', `Message sent to ${input.number}: ${input.message}`);
  }

  private verifySignature(req: any) {
    const signature = req.headers['x-webhook-signature'];
    const webhookSecret = Env.WASENDER_WEBHOOK_SECRET;
    if (!signature || !webhookSecret || signature !== webhookSecret) return false;
    return true;
  }

  public async notifyDeveloper(message: string) {
    await this.sendMessageToNumber({
      number: '5551999772868',
      message: message
    })
  }
}
