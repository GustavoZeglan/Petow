import { BaseRepository } from "@architecture/repositories/base.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import UserEntity from "@architecture/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export default class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findUserById(userId: number) {
    return this.repository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.providerServices", "providerServices")
      .leftJoinAndSelect("providerServices.service", "service")
      .innerJoinAndSelect("user.type", "type")
      .where("user.id = :userId", { userId })
      .getOne();
  }
}
