import { Module } from "@nestjs/common";
import UserEntity from "@architecture/entities/user.entity";
import AddressEntity from "@architecture/entities/address.entity";
import UserTypeEntity from "@architecture/entities/user_type.entity";
import { BaseRepository } from "@architecture/repositories/base.repository";
import UserRepository from "@architecture/repositories/user.repository";
import AddressRepository from "@architecture/repositories/address.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetsModule } from "../pets/pets.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserTypeEntity, AddressEntity]),
    PetsModule,
  ],
  controllers: [],
  providers: [BaseRepository, UserRepository, AddressRepository],
  exports: [UserRepository, AddressRepository],
})
export class UsersModule {}
