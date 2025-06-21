import { ConversationState } from "../enums/conversation-state-enum";

export type UserEntity = {
  id: string;
  name: string;
  phone: string;
  email: string;
  relation_with_master: string,
  what_likes: string,
  what_knows: string,
  what_does: string,
  conversation_state: ConversationState,
  created_at: string;
  updated_at: string;
};
