import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseService } from "./database.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: String(process.env.POSTGRES_USER),
        password: String(process.env.POSTGRES_PASSWORD),
        database: process.env.POSTGRES_DB,
        logging: process.env.DATABASE_LOGGING === "true",
        ssl: process.env.NODE_ENV === "development" ? false : true,
        migrations: [__dirname + "/infra/typeorm/migrations/**/*{.ts,.js}"],
        entities: [__dirname + "/**/*.entity.{js,ts}"],
        synchronize: false,
        migrationsRun: true,
      }),
    }),
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class DatabaseModule {}
