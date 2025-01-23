import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

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
      throw new InternalServerErrorException(
        "Failed to fetch database version",
      );
    }
  }

  async runMigrations() {
    try {
      const executedMigrations = await this.dataSource.runMigrations();
      Logger.log(`Migrations executed successfully ${executedMigrations}`);
      return executedMigrations;
    } catch (error) {
      throw new InternalServerErrorException("Failed to run migrations");
    }
  }

  async getHasPendingMigrations() {
    const hasPendingMigrations = await this.dataSource.showMigrations();
    Logger.log(`Has Pending migrations ${hasPendingMigrations}`);
    return hasPendingMigrations;
  }

  async cleanDatabase() {
    await this.dataSource.query(
      "drop schema public cascade; create schema public;",
    );
  }
}
