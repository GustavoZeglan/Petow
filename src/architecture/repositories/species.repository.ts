import { BaseRepository } from "@architecture/repositories/base.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import SpeciesEntity from "@architecture/entities/species.entity";

@Injectable()
export default class SpeciesRepository extends BaseRepository<SpeciesEntity> {
  constructor(
    @InjectRepository(SpeciesEntity) private repository: Repository<SpeciesEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
