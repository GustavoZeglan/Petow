import { BaseRepository } from "@architecture/repositories/base.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import ProviderServiceEntity from "@architecture/entities/provider_service.entity";
import { Repository } from "typeorm";
import ServiceEntity from "@architecture/entities/service.entity";
import { GetProviderServiceDTO } from "@app/domains/services/dtos/GetProvidersDTO";

@Injectable()
export default class ProviderServiceRepository extends BaseRepository<ProviderServiceEntity> {
  constructor(
    @InjectRepository(ProviderServiceEntity)
    private repository: Repository<ProviderServiceEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findProviders(
    service: ServiceEntity,
    userId: number,
    query: GetProviderServiceDTO,
  ) {
    const serviceId = service.id;

    const services = this.repository
      .createQueryBuilder("providerService")
      .innerJoinAndSelect("providerService.provider", "provider")
      .innerJoinAndSelect("provider.type", "type")
      .where("providerService.service = :serviceId", { serviceId })
      .andWhere("provider.id != :userId", { userId })
      .andWhere("type.id = 2");

    if (query.name) {
      services.andWhere("LOWER(provider.name) LIKE LOWER(:name)", {
        name: `%${query.name}%`,
      });
    }

    services.orderBy("providerService.price", query.order);

    const results = await services.getMany();

    return results;
  }
}
