import { Logger } from "../../domain/utils/logger";
import { Env } from "../../main/utils/env";
import { Pool, PoolClient } from "pg";

export class DatabaseConnection {
  private static connection: PoolClient;

  public static async connect() {
    const databasePool = new Pool({
      user: Env.DB_USER,
      host: Env.DB_HOST,
      database: Env.DB_NAME,
      password: Env.DB_PASSWORD,
      port: Number(Env.DB_PORT),
    });

    if (!DatabaseConnection.connection) {
      DatabaseConnection.connection = await databasePool.connect();
    }
  }

  public static async disconnect() {
    await DatabaseConnection.connection.release();
  }

  public static async startTransaction() {
    await DatabaseConnection.connection.query("BEGIN");
  }

  public static async commit() {
    await DatabaseConnection.connection.query("COMMIT");
  }

  public static async rollback() {
    await DatabaseConnection.connection.query("ROLLBACK");
  }

  public static async query(query: {
    sql: string;
    params: any[];
  }): Promise<any[]> {
    Logger.dbQuery(query);
    const result = await DatabaseConnection.connection.query(
      query.sql,
      query.params
    );
    Logger.dbResponse(result);
    return result.rows;
  }
}
