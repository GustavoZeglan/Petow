import { BaseRepository } from "@architecture/repositories/base.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import AddressEntity from "@users/entities/address.entity";
import { Repository } from "typeorm";

@Injectable()
export default class AddressRepository extends BaseRepository<AddressEntity> {
  constructor(@InjectRepository(AddressEntity) private repository: Repository<AddressEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
};
