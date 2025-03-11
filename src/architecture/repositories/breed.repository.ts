import { BaseRepository } from "@architecture/repositories/base.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BreedEntity from "@architecture/entities/breed.entity";

@Injectable()
export default class BreedRepository extends BaseRepository<BreedEntity> {
  constructor(
    @InjectRepository(BreedEntity) private repository: Repository<BreedEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
