import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import * as dotenv from "dotenv";
import { DatabaseService } from "./database/database.service";
import { RequestLoggerMiddleware } from "./common/middlewares/request-logger.middleware";
import { ConfigModule } from "@nestjs/config";
import { ServiceService } from "./service/service.service";
import { ServiceController } from "./service/service.controller";
import ServiceEntity from "./core/entities/service.entity";
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    DatabaseModule,
    ServiceEntity,
  ],
  controllers: [AppController, ServiceController],
  providers: [AppService, DatabaseService, ServiceService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}
