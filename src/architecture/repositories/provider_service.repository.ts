import { BaseRepository } from "@architecture/repositories/base.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import ProviderServiceEntity from "@architecture/entities/provider_service.entity";
import { Repository } from "typeorm";

@Injectable()
export default class ProviderServiceRepository extends BaseRepository<ProviderServiceEntity> {
  constructor(
    @InjectRepository(ProviderServiceEntity)
    private repository: Repository<ProviderServiceEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
