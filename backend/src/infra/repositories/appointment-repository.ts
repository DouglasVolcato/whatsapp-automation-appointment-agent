import { Repository } from "../database/repository";

export class AppointmentRepositorty extends Repository {
  public constructor() {
    super({
      tableName: "appointments",
      idField: "id",
      publicFields: [
        "id",
        "user_id",
        "when",
        "title",
        "description",
        "created_at",
        "updated_at",
      ],
      insertFields: [
        "id",
        "user_id",
        "when",
        "title",
        "description",
      ],
      updateFields: [
        "user_id",
        "when",
        "title",
        "description",
      ],
    });
  }

  public async getManyByDay(input: { day: string }): Promise<any[]> {
    const query = `SELECT * FROM appointments WHERE when = $1;`;
    return await this.executeSql({ query: query, params: [input.day] });
  }

  public async getManyByUser(input: { user_id: string }): Promise<any[]> {
    const query = `SELECT * FROM appointments WHERE user_id = $1;`;
    return await this.executeSql({ query: query, params: [input.user_id] });
  }
}
