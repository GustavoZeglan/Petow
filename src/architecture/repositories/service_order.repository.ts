import { BaseRepository } from "@architecture/repositories/base.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import ServiceOrderEntity from "@architecture/entities/service_order.entity";
import { Repository } from "typeorm";
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
}
