import FeedbackRepository from "@architecture/repositories/feedback.repository";
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateFeedbackDTO } from "@feedbacks/dtos/CreateFeedbackDTO";
import UserRepository from "@architecture/repositories/user.repository";
import ServiceProvidedRepository from "@architecture/repositories/service_provided.repository";
import { FeedbackTypeEnum } from "@architecture/enums/feedback-type.enum";
import FeedbackEntity from "@architecture/entities/feedback.entity";
import FeedbackTypeRepository from "@architecture/repositories/feedback_type.repository";
import { FeedbackEntityType } from "@architecture/enums/entity.enum";
import { ListFeedbackDTO } from "@feedbacks/dtos/ListFeedbackDTO";
import { UpdateFeedbackDTO } from "@feedbacks/dtos/UpdateFeedbackDTO";

@Injectable()
export class FeedbackService {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly userRepository: UserRepository,
    private readonly serviceProvidedRepository: ServiceProvidedRepository,
    private readonly feedbackTypeRepository: FeedbackTypeRepository,
  ) {}

  async createFeedback(userId: number, createFeedbackDTO: CreateFeedbackDTO) {
    const sender = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!sender) {
      Logger.error("Sender Invalid");
      throw new BadRequestException("Sender Invalid");
    }

    const receiver = await this.userRepository.findOne({
      where: { id: createFeedbackDTO.receiverId },
      relations: ["pets"],
    });

    if (!receiver) {
      Logger.error("Receiver Invalid");
      throw new BadRequestException("Receiver Invalid");
    }

    if (sender.id === receiver.id) {
      Logger.error("Sender and receiver cannot be the same");
      throw new BadRequestException("Sender and receiver cannot be the same");
    }

    const serviceProvided = await this.serviceProvidedRepository.findOne({
      where: { id: createFeedbackDTO.serviceProvidedId },
    });

    if (!serviceProvided) {
      Logger.error("Service provided Invalid");
      throw new BadRequestException("Service provided Invalid");
    }

    const feedbackType = await this.feedbackTypeRepository.findOne({
      where: { type: createFeedbackDTO.feedbackType },
    });

    if (!feedbackType) {
      Logger.error("Feedback type Invalid");
      throw new BadRequestException("Feedback type Invalid");
    }

    let feedbackToCreate: FeedbackEntity;

    if (createFeedbackDTO.feedbackType === FeedbackTypeEnum.PET_RATING) {
      const pet = await this.userRepository.findOne({
        where: { id: createFeedbackDTO.petId },
      });

      if (!pet) {
        Logger.error("Pet Invalid");
        throw new BadRequestException("Pet Invalid");
      }

      if (receiver.pets && !receiver.pets.some((pet) => pet.id === pet.id)) {
        throw new BadRequestException("Pet not found in receiver's pets");
      }

      feedbackToCreate = this.feedbackRepository.create({
        ...createFeedbackDTO,
        feedbackType: feedbackType,
        sender: sender,
        receiver: receiver,
        serviceProvided: serviceProvided,
        pet: pet,
      });
    } else if (
      createFeedbackDTO.feedbackType === FeedbackTypeEnum.USER_RATING
    ) {
      feedbackToCreate = this.feedbackRepository.create({
        ...createFeedbackDTO,
        feedbackType: feedbackType,
        sender: sender,
        receiver: receiver,
        serviceProvided: serviceProvided,
      });
    } else {
      Logger.error("Invalid feedback type");
      throw new BadRequestException("Invalid feedback type");
    }

    const feedback = await this.feedbackRepository.save(feedbackToCreate);
    feedback.toModel();

    return feedback;
  }

  async getFeedbacks(
    query: ListFeedbackDTO,
    id: number,
    entity?: FeedbackEntityType,
  ) {
    const feedbacks = await this.feedbackRepository.findFeedbacks(
      query,
      id,
      entity,
    );

    for (const feedback of feedbacks) {
      feedback.toModel();
    }

    return feedbacks;
  }

  async updateFeedback(
    userId: number,
    id: number,
    updateFeedbackDTO: UpdateFeedbackDTO,
  ) {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: ["sender"],
    });

    if (!feedback) {
      Logger.error("Feedback not found");
      throw new NotFoundException("Feedback not found");
    }

    const sender = await this.userRepository.findOne({
      where: { id: feedback.sender.id },
    });

    if (!sender || sender.id !== userId) {
      Logger.error(
        `User ${userId} are not allowed to update this feedback ${id}`,
      );
      throw new UnauthorizedException(
        "You are not allowed to update this feedback",
      );
    }

    if (Object.keys(updateFeedbackDTO).length === 0) {
      throw new BadRequestException("No update data provided");
    }

    const feedbackToUpdate = this.feedbackRepository.create({
      ...feedback,
      ...updateFeedbackDTO,
    });

    const updatedFeedback =
      await this.feedbackRepository.save(feedbackToUpdate);
    updatedFeedback.toModel();

    return updatedFeedback;
  }

  async deleteFeedback(userId: number, id: number) {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: ["sender"],
    });

    if (!feedback) {
      Logger.error("Feedback not found");
      throw new NotFoundException("Feedback not found");
    }

    const sender = await this.userRepository.findOne({
      where: { id: feedback.sender.id },
    });

    if (!sender || sender.id !== userId) {
      Logger.error(
        `User ${userId} are not allowed to delete this feedback ${id}`,
      );
      throw new UnauthorizedException(
        "You are not allowed to delete this feedback",
      );
    }

    await this.feedbackRepository.delete(id);
  }
}
