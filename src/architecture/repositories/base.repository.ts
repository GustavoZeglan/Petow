import { Logger } from "@nestjs/common";
import {
  EntityManager,
  EntityTarget,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Like,
  ObjectLiteral,
  QueryRunner,
  Repository,
} from "typeorm";

type FindManyOptions<T> = {
  search?: FindOptionsWhere<T>[] | FindOptionsWhere<T>;
  filter?: FindOptionsWhere<T>[] | FindOptionsWhere<T>;
  includes?: string[];
  select?: FindOptionsSelect<T>;
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

  private formatSearch(
    search: FindOptionsWhere<T>,
    userId?: number,
  ): FindOptionsWhere<T> {
    const searchFormatted: Partial<Record<keyof T, any>> = {};

    for (const key in search) {
      if (Object.prototype.hasOwnProperty.call(search, key)) {
        const value = search[key];

        if (key === "customerId" || key === "providerId") {
          if (userId) {
            searchFormatted[key as keyof T] = userId;
          }
        } else if (typeof value === "string") {
          searchFormatted[key as keyof T] = Like(`%${value.toLowerCase()}%`);
        } else {
          searchFormatted[key as keyof T] = value;
        }
      }
    }

    return searchFormatted as FindOptionsWhere<T>;
  }

  async findMany(query: FindManyOptions<T>, userId?: number) {
    Logger.log(`Find many with query: ${JSON.stringify(query)}`);

    if (userId) {
      query.search = query.search || {};
      query.search["user"] = { id: userId };
    }

    const search: FindOptionsWhere<T> =
      query.search || userId
        ? this.formatSearch(query.search as FindOptionsWhere<T>)
        : {};

    const relations: FindOptionsRelations<T> = query.includes
      ? Array.isArray(query.includes)
        ? query.includes.reduce(
            (acc, include) => ({ ...acc, [include]: true }),
            {},
          )
        : { [query.includes]: true }
      : {};

    const whereFormatted = { ...query.filter, ...search };

    return this.find({
      select: query.select,
      take: query.pageSize,
      skip: query.page,
      relations: relations,
      where: whereFormatted,
    });
  }
}
