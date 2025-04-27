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

  private buildSearchConditionsByEntity(
    id: number,
    entity?: string,
  ): FindOptionsWhere<FeedbackEntity>[] {
    switch (entity) {
      case FeedbackEntityType.PET:
        return [{ pet: { id } }];
      case FeedbackEntityType.USER:
      default:
        return [{ receiver: { id } }];
    }
  }

  async findFeedbacks(query: any, id: number, entity?: FeedbackEntityType) {
    Logger.log(
      `Finding feedbacks for ${entity || FeedbackEntityType.USER} ${id} with query: ${JSON.stringify(query)}`,
    );

    const entityBasedConditions = this.buildSearchConditionsByEntity(
      id,
      entity,
    );
    const searchConditions = [
      ...this.normalizeSearchConditions(query?.filter || {}),
      ...entityBasedConditions,
    ];

    const { page, pageSize } = this.normalizePagination(
      query?.page,
      query?.pageSize,
    );

    return this.find({
      select: query?.select,
      take: pageSize,
      relations: this.buildRelations(query?.includes || []),
      where: searchConditions,
      order: query?.order,
      ...(page && pageSize
        ? {
            take: pageSize,
            skip: (page - 1) * pageSize,
          }
        : {}),
    });
  }
}
