import { Repository } from "../database/repository";

export class AppointmentRepositorty extends Repository {
  public constructor() {
    super({
      tableName: "appointments",
      idField: "id",
      publicFields: [
        "id",
        "user_id",
        "date_time",
        "title",
        "description",
        "created_at",
        "updated_at",
      ],
      insertFields: ["id", "user_id", "date_time", "title", "description"],
      updateFields: ["user_id", "date_time", "title", "description"],
    });
  }

  public async getManyByDay(input: { day: string }): Promise<any[]> {
    const query = `SELECT * FROM appointments WHERE date_time = $1;`;
    return await this.executeSql({ query: query, params: [input.day] });
  }

  public async getAvailableHours(input: { day: string }): Promise<any[]> {
    const query = `
      WITH all_hours AS (
        SELECT generate_series(
          date_trunc('day', $1::timestamp),
          date_trunc('day', $1::timestamp) + interval '23 hours',
          interval '1 hour'
        ) AS hour
      ),
      scheduled_hours AS (
        SELECT date_trunc('hour', date_time) AS hour
        FROM appointments
        WHERE date_trunc('day', date_time) = date_trunc('day', $1::timestamp)
      )
      SELECT hour FROM all_hours
      WHERE hour NOT IN (SELECT hour FROM scheduled_hours);
    `;
    return await this.executeSql({ query: query, params: [input.day] });
  }

  public async getManyByUser(input: { user_id: string }): Promise<any[]> {
    const query = `SELECT * FROM appointments WHERE user_id = $1;`;
    return await this.executeSql({ query: query, params: [input.user_id] });
  }
}
