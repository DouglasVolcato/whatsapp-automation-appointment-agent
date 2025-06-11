import { DatabaseConnection } from "../../infra/database/connection";
import { DatabaseMigrations } from "../../infra/database/migrations";
import { Logger } from "../../domain/utils/logger";

export async function makeDatabaseConnection() {
  try {
    await DatabaseConnection.connect();
    Logger.writeLog("logs/db.txt", "Database connected");
    await new DatabaseMigrations().runMigrations();
    Logger.writeLog("logs/db.txt", "Database migrations run");
  } catch (err) {
    Logger.error(new Error(`Database connection failed`));
  }
}
