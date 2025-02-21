import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseService } from "@infra/database/database.service";
import { DatabaseConfig } from "./database.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => DatabaseConfig.connect(),
    }),
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class DatabaseModule {}
