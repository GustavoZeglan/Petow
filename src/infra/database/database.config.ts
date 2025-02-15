import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { config } from 'dotenv';
config();

console.log(join(__dirname, '..', 'domains', 'pets', 'entities', '*.entity.{js,ts}'));

export class DatabaseConfig {
  static connect(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: String(process.env.POSTGRES_USER),
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      ssl: getSSLValues(),
      entities: [
        join(__dirname, '..', '..','domains', 'pets', 'entities', '*.entity.{js,ts}'),
        join(__dirname, '..', '..', 'domains', 'services', 'entities', '*.entity.{js,ts}'),
        join(__dirname, '..', '..', 'domains', 'users', 'entities', '*.entity.{js,ts}'),
      ],
      logging: process.env.DATABASE_LOGGING === "true",
      migrations: [join(__dirname, "migrations", "*{.ts,.js}")],
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
