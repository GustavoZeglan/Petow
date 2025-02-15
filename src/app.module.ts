import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "@app/app.controller";
import { AppService } from "@app/app.service";
import { DatabaseModule } from "@infra/database/database.module";
import * as dotenv from "dotenv";
import { DatabaseService } from "@infra/database/database.service";
import { RequestLoggerMiddleware } from "@architecture/middlewares/request-logger.middleware";
import { ConfigModule } from "@nestjs/config";
import { PetsModule } from '@pets/pets.module';
import { ServicesModule } from '@services/services.module';
import { UsersModule } from '@users/users.module';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    DatabaseModule,
    PetsModule,
    ServicesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}
