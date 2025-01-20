import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { getNewClient } from "src/infra/data-source";
import { DataSource } from "typeorm";
import { join } from "path";
import migrationRunner, { RunnerOption } from "node-pg-migrate";
import { Client } from "pg";

@Injectable()
export class DatabaseService {
  databaseName: string | undefined;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.databaseName = process.env.POSTGRES_DB;
  }

  async getOpenedConnections(): Promise<number> {
    try {
      const result = await this.dataSource.query(`
          SELECT
            count(*)::int AS opened_connections
          FROM
            pg_stat_activity
          WHERE
            datname = '${this.databaseName}'
        `);
      return result[0].opened_connections;
    } catch (error) {
      console.error("Error fetching active connections", error);
      throw new Error("Failed to fetch active connections");
    }
  }

  async getMaxConnections(): Promise<number> {
    try {
      const result = await this.dataSource.query(`
          SHOW max_connections
        `);
      return result[0].max_connections;
    } catch (error) {
      console.error("Error fetching opened connections", error);
      throw new Error("Failed to fetch opened connections");
    }
  }

  async getDatabaseVersion(): Promise<string> {
    try {
      const result = await this.dataSource.query(`
          SHOW server_version; 
        `);
      return result[0].server_version;
    } catch (error) {
      console.error("Error fetching database version", error);
      throw new Error("Failed to fetch database version");
    }
  }

  async executeMigrations() {
    const dbClient = await getNewClient();
    const defaultMigrationOptions = await this.getDefaultMigrationOptions(false, dbClient);

    const migretedMigrations = await migrationRunner(defaultMigrationOptions);
    await dbClient.end();

    return migretedMigrations;
  }

  async getPendingMigrations() {
    const dbClient = await getNewClient();
    const defaultMigrationOptions = await this.getDefaultMigrationOptions(true, dbClient);

    const pendingMigrations = await migrationRunner(defaultMigrationOptions);
    await dbClient.end();

    return pendingMigrations;
  }

  private async getDefaultMigrationOptions(isDry: boolean, dbClient: Client): Promise<RunnerOption> {
    const defaultMigrationOptions = {
      dbClient,
      dryRun: isDry,
      dir: join("src", "infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    } as RunnerOption;
    
    return defaultMigrationOptions;
  }

  async cleanDatabase() {
    await this.dataSource.query("drop schema public cascade; create schema public;");
  }

}
