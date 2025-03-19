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

export type FindManyOptions<T> = {
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

  protected normalizeSearchConditions(
    searchQuery?: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
  ): FindOptionsWhere<T>[] {
    if (!searchQuery) return [];
    return Array.isArray(searchQuery) ? searchQuery : [searchQuery];
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
    return {
      page: page && page > 0 ? page : 1,
      pageSize: pageSize && pageSize > 0 ? pageSize : 10,
    };
  }

  protected buildWhereClause(
    searchConditions: FindOptionsWhere<T>[],
    filter?: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
  ): FindOptionsWhere<T> | FindOptionsWhere<T>[] {
    const formattedSearch = searchConditions.map((condition) =>
      this.formatSearch(condition),
    );

    if (!filter) {
      return formattedSearch.length === 1
        ? formattedSearch[0]
        : formattedSearch;
    }

    const filters = this.normalizeSearchConditions(filter);
    return [...filters, ...formattedSearch];
  }

  formatSearch(
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

    const searchConditions = this.normalizeSearchConditions(query.search);
    if (userId) {
      searchConditions.push({
        user: { id: userId },
      } as unknown as FindOptionsWhere<T>);
    }

    const { page, pageSize } = this.normalizePagination(
      query.page,
      query.pageSize,
    );

    return this.find({
      select: query.select,
      take: pageSize,
      skip: (page - 1) * pageSize,
      relations: this.buildRelations(query.includes),
      where: this.buildWhereClause(searchConditions, query.filter),
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
