import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join, resolve } from "path";
import { config } from "dotenv";
config();

export class DatabaseConfig {
  static connect(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: String(process.env.POSTGRES_USER),
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      ssl: getSSLValues(),
      entities: [
        resolve(
          join(
            __dirname,
            "..",
            "..",
            "architecture",
            "entities",
            "*.entity.{js,ts}",
          ),
        ),
      ],
      migrations: [resolve(join(__dirname, "..", "migrations", "*{.ts,.js}"))],
      logging: process.env.DATABASE_LOGGING === "true",
      migrationsTableName: "migrations",
      synchronize: false,
      migrationsRun: false,
    };
  }
}

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return { ca: process.env.POSTGRES_CA };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}
