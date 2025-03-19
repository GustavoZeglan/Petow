import {
  BaseRepository,
  FindManyOptions,
} from "@architecture/repositories/base.repository";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import ServiceOrderEntity from "@architecture/entities/service_order.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { UserTypeEnum } from "@architecture/enums/user-type.enum";

@Injectable()
export default class ServiceOrderRepository extends BaseRepository<ServiceOrderEntity> {
  constructor(
    @InjectRepository(ServiceOrderEntity)
    private repository: Repository<ServiceOrderEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findServiceOrderInfo(id: number) {
    return this.createQueryBuilder("serviceOrder")
      .innerJoinAndSelect("serviceOrder.customer", "customer")
      .innerJoinAndSelect("serviceOrder.provider", "provider")
      .innerJoinAndSelect("customer.type", "customerUserType")
      .innerJoinAndSelect("provider.type", "providerUserType")
      .innerJoinAndSelect("serviceOrder.serviceOrderPets", "serviceOrderPets")
      .innerJoinAndSelect("serviceOrderPets.pet", "pet")
      .innerJoinAndSelect("pet.breed", "breed")
      .innerJoinAndSelect("serviceOrder.service", "service")
      .innerJoinAndSelect("serviceOrder.address", "address")
      .where("serviceOrder.id = :id", { id })
      .getOne();
  }

  private buildSearchConditionsByRole(
    userId: number,
    role?: string,
  ): FindOptionsWhere<ServiceOrderEntity>[] {
    switch (role) {
      case UserTypeEnum.CUSTOMER:
        return [{ customer: { id: userId } }];
      case UserTypeEnum.PROVIDER:
        return [{ provider: { id: userId } }];
      default:
        return [{ customer: { id: userId } }, { provider: { id: userId } }];
    }
  }

  async findServiceOrders(
    query: FindManyOptions<ServiceOrderEntity>,
    userId: number,
    role?: string,
  ) {
    Logger.log(
      `Finding service orders for user ${userId} with query: ${JSON.stringify(query)}`,
    );

    const roleBasedConditions = this.buildSearchConditionsByRole(userId, role);
    const searchConditions = [
      ...this.normalizeSearchConditions(query.search),
      ...roleBasedConditions,
    ];

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
}
