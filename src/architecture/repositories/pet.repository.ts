import { BaseRepository } from "@architecture/repositories/base.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import PetEntity from "@architecture/entities/pet.entity";
import { In, Repository } from "typeorm";

@Injectable()
export default class PetRepository extends BaseRepository<PetEntity> {
  constructor(
    @InjectRepository(PetEntity) private repository: Repository<PetEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findByIdsWithUserValidation(petIds: number[], customerId: number) {
    return this.repository.find({
      where: {
        id: In(petIds),
        user: { id: customerId },
      },
    });
  }
}
