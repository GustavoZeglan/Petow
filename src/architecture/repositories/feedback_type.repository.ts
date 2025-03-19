import FeedbackTypeEntity from "@architecture/entities/feedback_type.entity";
import { BaseRepository } from "@architecture/repositories/base.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export default class FeedbackTypeRepository extends BaseRepository<FeedbackTypeEntity> {
  constructor(
    @InjectRepository(FeedbackTypeEntity)
    private repository: Repository<FeedbackTypeEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
