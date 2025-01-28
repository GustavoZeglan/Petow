"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var dotenv_1 = require("dotenv");
var path_1 = require("path");
(0, dotenv_1.config)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: String(process.env.POSTGRES_USER),
    password: String(process.env.POSTGRES_PASSWORD),
    database: process.env.POSTGRES_DB,
    logging: process.env.DATABASE_LOGGING === "true",
    ssl: getSSLValues(),
    entities: [(0, path_1.join)(__dirname, "..", "core", "entities", "*.entity.{js,ts}")],
    migrations: [(0, path_1.join)(__dirname, "migrations", "*{.ts,.js}")],
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
