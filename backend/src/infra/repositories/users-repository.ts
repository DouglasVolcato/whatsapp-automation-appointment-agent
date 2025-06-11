import { Repository } from "../database/repository";

export class UsersRepositorty extends Repository {
  public constructor() {
    super({
      tableName: "users",
      idField: "id",
      publicFields: [
        "id",
        "name",
        "phone",
        "email",
        "relation_with_master",
        "what_likes",
        "what_knows",
        "what_does",
        "conversation_state",
        "created_at",
        "updated_at",
      ],
      insertFields: [
        "id",
        "name",
        "phone",
        "email",
        "relation_with_master",
        "what_likes",
        "what_knows",
        "what_does",
        "conversation_state",
      ],
      updateFields: [
        "name",
        "phone",
        "email",
        "relation_with_master",
        "what_likes",
        "what_knows",
        "what_does",
        "conversation_state",
      ],
    });
  }
}
