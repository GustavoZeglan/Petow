import { BaseRepository } from "@architecture/repositories/base.repository";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import FeedbackEntity from "@architecture/entities/feedback.entity";
import { FeedbackEntityType } from "@architecture/enums/entity.enum";

@Injectable()
export default class FeedbackRepository extends BaseRepository<FeedbackEntity> {
  constructor(
    @InjectRepository(FeedbackEntity)
    private repository: Repository<FeedbackEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
    Object.assign(this, repository);
  }

  async findUserFeedbackForServiceProvided(
    userId: number,
    serviceProvidedId: number,
  ): Promise<FeedbackEntity | null> {
    return this.repository
      .createQueryBuilder("feedback")
      .where("feedback.sender_user_id = :userId", { userId })
      .andWhere("feedback.service_provided_id = :serviceProvidedId", {
        serviceProvidedId,
      })
      .andWhere("feedback.deleted_at IS NULL")
      .leftJoinAndSelect("feedback.feedbackType", "feedbackType")
      .leftJoinAndSelect("feedback.receiver", "receiver")
      .leftJoinAndSelect("feedback.sender", "sender")
      .leftJoinAndSelect("feedback.pet", "pet")
      .leftJoinAndSelect("feedback.serviceProvided", "serviceProvided")
      .getOne();
  }

  async findFeedbacks(query: any, id: number, entity?: FeedbackEntityType) {
    Logger.log(
      `Finding feedbacks for ${entity || FeedbackEntityType.USER} ${id} with query: ${JSON.stringify(query)}`,
    );

    const { page, pageSize } = this.normalizePagination(
      query?.page,
      query?.pageSize,
    );

    const qb = this.repository
      .createQueryBuilder("feedback")
      .leftJoinAndSelect("feedback.sender", "sender")
      .leftJoinAndSelect("feedback.receiver", "receiver")
      .leftJoinAndSelect("feedback.pet", "pet")
      .leftJoinAndSelect("feedback.serviceProvided", "serviceProvided")
      .leftJoinAndSelect("feedback.feedbackType", "feedbackType");

    if (entity === FeedbackEntityType.PET) {
      qb.where("pet.id = :id", { id });
    } else {
      qb.where("receiver.id = :id", { id });
    }

    if (page && pageSize) {
      qb.skip((page - 1) * pageSize).take(pageSize);
    }

    return qb.getMany();
  }
}
