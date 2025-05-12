import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "@app/app.controller";
import { AppService } from "@app/app.service";
import { DatabaseModule } from "@infra/database/database.module";
import * as dotenv from "dotenv";
import { DatabaseService } from "@infra/database/database.service";
import { RequestLoggerMiddleware } from "@architecture/middlewares/request-logger.middleware";
import { PetsModule } from "@pets/pets.module";
import { ServicesModule } from "@services/services.module";
import { UsersModule } from "@users/users.module";
import { AuthModule } from "@auth/auth.module";
import { FeedbackModule } from "@feedbacks/feedback.module";
import { UploadModule } from "@upload/upload.module";
dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    PetsModule,
    ServicesModule,
    UsersModule,
    AuthModule,
    FeedbackModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}
