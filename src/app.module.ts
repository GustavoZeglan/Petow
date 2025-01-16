import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from './database/database.module';
import * as dotenv from "dotenv";
import { DatabaseService } from "./database/database.service";
dotenv.config();

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
