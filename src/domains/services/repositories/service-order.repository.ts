import { BaseRepository } from "@architecture/repositories/base.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import ServiceOrderEntity from "@services/entities/service_order.entity";
import { Repository } from "typeorm";

@Injectable()
export default class ServiceOrderRepository extends BaseRepository<ServiceOrderEntity> {

  constructor(@InjectRepository(ServiceOrderEntity) private repository: Repository<ServiceOrderEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findServiceOrderInfo(
    this: Repository<ServiceOrderEntity>,
    id: number,
  ) {
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

  async findServiceOrdersByUserId(
    userId: number,
    type: string,
  ): Promise<ServiceOrderEntity[]> {
    return this.createQueryBuilder("serviceOrder")
      .innerJoinAndSelect("serviceOrder.customer", "customer")
      .innerJoinAndSelect("serviceOrder.provider", "provider")
      .innerJoinAndSelect("customer.type", "customerUserType")
      .innerJoinAndSelect("provider.type", "providerUserType")
      .innerJoinAndSelect("serviceOrder.service", "service")
      .where(
        type === "Customer"
          ? "customer.id = :userId"
          : "provider.id = :userId",
        { userId },
      )
      .getMany();
  }

  async markServiceOrderAsAccepted(
    this: Repository<ServiceOrderEntity>,
    serviceOrderId: number,
  ) {
    await this.update({ id: serviceOrderId }, { isAccepted: true });
  }

};
