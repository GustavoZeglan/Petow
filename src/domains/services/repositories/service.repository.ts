import { BaseRepository } from "@architecture/repositories/base.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import ServiceEntity from "@services/entities/service.entity";
import { Repository } from "typeorm";

@Injectable()
export default class ServiceRepository extends BaseRepository<ServiceEntity> {
  constructor(@InjectRepository(ServiceEntity) private repository: Repository<ServiceEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
};
