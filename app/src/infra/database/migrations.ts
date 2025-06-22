import { UuidGenerator } from "../../domain/utils/uuid-generator";
import { Logger } from "../../domain/utils/logger";
import { DatabaseConnection } from "./connection";
import * as path from "path";
import * as fs from "fs";

export class DatabaseMigrations {
  private folderPath: string;

  public constructor() {
    this.folderPath = "db/migrations";
  }

  public async runMigrations(): Promise<void> {
    await this.ensureMigrationsTable();

    const migrationFiles = fs
      .readdirSync(this.folderPath)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    for (const file of migrationFiles) {
      const filePath = path.join(this.folderPath, file);
      const sql = fs.readFileSync(filePath, "utf8");

      const alreadyRun = await this.hasMigrationRun(file);
      if (alreadyRun) {
        continue;
      }

      try {
        await DatabaseConnection.startTransaction();
        await DatabaseConnection.query({ sql, params: [] });
        await this.recordMigration(file);
        await DatabaseConnection.commit();
        Logger.writeLog("logs/db.txt", `Migration successful: ${file}`);
      } catch (err) {
        await DatabaseConnection.rollback();
        Logger.error(new Error(`Migration failed: ${file}`));
        throw err;
      }
    }
  }

  private async ensureMigrationsTable(): Promise<void> {
    const sql = `
      CREATE TABLE IF NOT EXISTS migrations (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        run_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await DatabaseConnection.query({ sql, params: [] });
  }

  private async hasMigrationRun(name: string): Promise<boolean> {
    const sql = `SELECT 1 FROM migrations WHERE name = $1`;
    const result = await DatabaseConnection.query({ sql, params: [name] });
    if (result.length === 0) {
      return false;
    } else {
      return result.length > 0;
    }
  }

  private async recordMigration(name: string): Promise<void> {
    const sql = `INSERT INTO migrations (id, name) VALUES ($1, $2)`;
    await DatabaseConnection.query({
      sql,
      params: [UuidGenerator.generate(), name],
    });
  }
}
