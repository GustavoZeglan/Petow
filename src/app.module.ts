import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: String(process.env.POSTGRES_USER),
        password: String(process.env.POSTGRES_PASSWORD),
        database: process.env.POSTGRES_DB,
        logging: process.env.DATABASE_LOGGING === 'true',
        migrations: [
          __dirname + '/share/infra/typeorm/migrations/**/*{.ts,.js}',
        ],
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: false,
        migrationsRun: true,
      }),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
