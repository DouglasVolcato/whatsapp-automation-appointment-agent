import { Repository } from "../database/repository";

export class UserLastMessagesRepositorty extends Repository {
  public constructor() {
    super({
      tableName: "user_last_messages",
      idField: "id",
      publicFields: [
        "id",
        "user_id",
        "sender",
        "content",
        "created_at",
        "updated_at",
      ],
      insertFields: ["id", "user_id", "sender", "content"],
      updateFields: [],
    });
  }

  public async deleteOldMessages(user_id: string): Promise<void> {
    const lastMessagesIds = await this.findMany({
      params: [{
        key: 'user_id',
        value: user_id
      }],
      limit: 4,
      offset: 0
    });
    await this.executeSql({
      query: `DELETE FROM user_last_messages WHERE user_id = $1 AND NOT (id = ANY($2::text[]))`,
      params: [user_id, lastMessagesIds.map(obj => obj.id)],
    });
  }
}
