import { DataSource } from "typeorm";
import { config } from "dotenv";
import { join, resolve } from "path";
config();

console.log(resolve(join("@infra", "migrations", "*{.ts,.js}")));
console.log(join("@architecture", "entities", "*.entity.{js,ts}"));

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: String(process.env.POSTGRES_USER),
  password: String(process.env.POSTGRES_PASSWORD),
  database: process.env.POSTGRES_DB,
  logging: process.env.DATABASE_LOGGING === "true",
  ssl: getSSLValues(),
  entities: [resolve(join("@architecture", "entities", "*.entity.{js,ts}"))],
  migrations: [resolve(join(__dirname, "..", "migrations", "*{.ts,.js}"))],
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
