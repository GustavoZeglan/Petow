import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import * as dotenv from "dotenv";
import { DatabaseService } from "./database/database.service";
import { RequestLoggerMiddleware } from "./common/middlewares/request-logger.middleware";
dotenv.config();

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}
