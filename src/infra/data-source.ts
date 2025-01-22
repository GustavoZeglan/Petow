import { DataSource } from "typeorm";
import { config } from "dotenv";
import { join } from "path";
config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: String(process.env.POSTGRES_USER),
  password: String(process.env.POSTGRES_PASSWORD),
  database: process.env.POSTGRES_DB,
  logging: process.env.DATABASE_LOGGING === "true",
  ssl: getSSLValues(),
  entities: [join(__dirname, "..", "core", "entities", "*.entity.{js,ts}")],
  migrations: [join(__dirname, "migrations", "*{.ts,.js}")],
  migrationsTableName: "migrations",
  synchronize: false,
  migrationsRun: false,
});

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return { ca: process.env.POSTGRES_CA };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}
