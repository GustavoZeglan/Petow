import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { FeedbackService } from "@feedbacks/services/feedback.service";
import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
import { RequestDTO } from "@architecture/dtos/RequestDTO";
import { CreateFeedbackDTO } from "@feedbacks/dtos/CreateFeedbackDTO";
import { JoiPipe } from "nestjs-joi";
import { ListFeedbackDTO } from "@feedbacks/dtos/ListFeedbackDTO";
import { UpdateFeedbackDTO } from "@feedbacks/dtos/UpdateFeedbackDTO";

@Controller("feedback")
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async createFeedback(
    @Req() req: RequestDTO,
    @Body(JoiPipe) createFeedbackDTO: CreateFeedbackDTO,
  ) {
    const userId = req.user.id;
    Logger.log(`User ${userId} is creating a feedback`);
    const feedback = await this.feedbackService.createFeedback(
      userId,
      createFeedbackDTO,
    );
    return new HttpResponseDTO(
      HttpStatus.CREATED,
      "Feedback created",
      feedback,
    );
  }

  @Get(":id")
  async getFeedbacks(
    @Req() req: RequestDTO,
    @Param("id", ParseIntPipe) id: number,
    @Query(JoiPipe) query: ListFeedbackDTO,
  ) {
    const userId = req.user.id;
    Logger.log(`User ${userId} is trying to see feedbacks of user/pet ${id}`);
    const feedbacks = await this.feedbackService.getFeedbacks(
      query,
      id,
      query?.entity,
    );
    return new HttpResponseDTO(HttpStatus.OK, "Feedbacks retrieved", feedbacks);
  }

  @Get("service/:id")
  async verifyUserFeedbackForServiceProvided(
    @Req() req: RequestDTO,
    @Param("id", ParseIntPipe) id: number,
  ) {
    const userId = req.user.id;
    Logger.log(
      `Verifying if ${userId} already make a feedback for serviceProvided ${id}`,
    );
    const feedback =
      await this.feedbackService.verifyUserFeedbackForServiceProvided(
        userId,
        id,
      );
    return new HttpResponseDTO(HttpStatus.OK, "Feedbacks retrieved", feedback);
  }

  @Patch(":id")
  async updateFeedback(
    @Req() req: RequestDTO,
    @Param("id") id: number,
    @Body(JoiPipe) updateFeedbackDTO: UpdateFeedbackDTO,
  ) {
    const userId = req.user.id;
    Logger.log(`User ${userId} is trying to update feedback ${id}`);
    const feedback = await this.feedbackService.updateFeedback(
      userId,
      id,
      updateFeedbackDTO,
    );
    return new HttpResponseDTO(HttpStatus.OK, "Feedback updated", feedback);
  }

  @Delete(":id")
  async deleteFeedback(@Req() req: RequestDTO, @Param("id") id: number) {
    const userId = req.user.id;
    Logger.log(`User ${userId} is trying to delete feedback ${id}`);
    await this.feedbackService.deleteFeedback(userId, id);
    return new HttpResponseDTO(HttpStatus.OK, "Feedback deleted");
  }
}
