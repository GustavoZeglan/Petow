import { forwardRef, Module } from "@nestjs/common";
import { FeedbackController } from "./controllers/feedback.controller";
import { FeedbackService } from "./services/feedback.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import FeedbackEntity from "@architecture/entities/feedback.entity";
import FeedbackTypeEntity from "@architecture/entities/feedback_type.entity";
import FeedbackRepository from "@architecture/repositories/feedback.repository";
import FeedbackTypeRepository from "@architecture/repositories/feedback_type.repository";
import { UsersModule } from "@users/users.module";
import { ServicesModule } from "@services/services.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([FeedbackEntity, FeedbackTypeEntity]),
    forwardRef(() => UsersModule),
    forwardRef(() => ServicesModule),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackRepository, FeedbackTypeRepository],
})
export class FeedbackModule {}
