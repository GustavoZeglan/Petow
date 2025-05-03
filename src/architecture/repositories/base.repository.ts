import { Logger } from "@nestjs/common";
import {
  EntityManager,
  EntityTarget,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  ObjectLiteral,
  QueryRunner,
  Repository,
} from "typeorm";

export type FindManyOptions<T> = {
  includes?: string[];
  page?: number;
  pageSize?: number;
};

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(
    target: EntityTarget<T>,
    manager: EntityManager,
    queryRunner?: QueryRunner,
  ) {
    super(target, manager, queryRunner);
  }

  protected buildRelations(
    includes?: string | string[],
  ): FindOptionsRelations<T> {
    if (!includes) return {};

    const includesArray = Array.isArray(includes) ? includes : [includes];
    return includesArray.reduce(
      (acc, include) => ({ ...acc, [include]: true }),
      {},
    );
  }

  protected normalizePagination(page?: number, pageSize?: number) {
    if (!pageSize || pageSize <= 0) {
      return {
        page: undefined,
        pageSize: undefined,
      };
    }

    return {
      page: page && page > 0 ? page : 1,
      pageSize,
    };
  }

  async findMany(query: FindManyOptions<T>, userId?: number) {
    Logger.log(`Find many with query: ${JSON.stringify(query)}`);

    const { page, pageSize } = this.normalizePagination(
      query.page,
      query.pageSize,
    );

    return this.find({
      relations: this.buildRelations(query.includes),
      ...(page && pageSize
        ? {
            take: pageSize,
            skip: (page - 1) * pageSize,
          }
        : {}),
    });
  }

  async findOneWithOptions(
    id: number,
    query?: { select?: FindOptionsSelect<T>; includes?: string[] },
  ): Promise<T | null> {
    Logger.log(
      `Finding one with id: ${id} and query: ${JSON.stringify(query)}`,
    );

    return this.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
      select: query?.select,
      relations: this.buildRelations(query?.includes),
    });
  }
}
