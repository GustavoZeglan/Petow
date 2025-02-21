import { ServiceProvidedEntity } from "@architecture/entities/service_provided.entity";
import { BaseRepository } from "@architecture/repositories/base.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

@Injectable()
export default class ServiceProvidedRepository extends BaseRepository<ServiceProvidedEntity> {
  constructor(
    @InjectRepository(ServiceProvidedEntity)
    private repository: Repository<ServiceProvidedEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
