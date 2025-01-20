import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseService } from "./database.service";
import { AppDataSource } from "src/infra/data-source";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return AppDataSource.options;
      }
    }),
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class DatabaseModule {}
