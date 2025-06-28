import { Repository } from "../database/repository";

export class AccessesRepository extends Repository {
  public constructor() {
    super({
      tableName: "accesses",
      idField: "id",
      publicFields: [
        "id",
        "email",
        "password",
        "created_at",
        "updated_at",
      ],
      insertFields: [
        "id",
        "email",
        "password",
      ],
      updateFields: [],
    });
  }
}
