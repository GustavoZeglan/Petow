import { Module } from '@nestjs/common';
import UserEntity from '@users/entities/user.entity';
import AddressEntity from '@users/entities/address.entity';
import UserTypeEntity from '@users/entities/user_type.entity';
import { BaseRepository } from '@architecture/repositories/base.repository';
import UserRepository from '@users/repositories/user.repository';
import AddressRepository from '@users/repositories/address.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsModule } from '../pets/pets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserTypeEntity,
      AddressEntity
    ]),
    PetsModule,
  ],
  controllers: [],
  providers: [
    BaseRepository,
    UserRepository,
    AddressRepository,
  ],
  exports: [
    UserRepository,
    AddressRepository,
  ]
})
export class UsersModule { }
