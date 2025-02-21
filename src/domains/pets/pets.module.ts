import { Module } from "@nestjs/common";
import PetEntity from "@architecture/entities/pet.entity";
import BreedEntity from "@architecture/entities/breed.entity";
import { BaseRepository } from "@architecture/repositories/base.repository";
import PetRepository from "@architecture/repositories/pet.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity, BreedEntity])],
  controllers: [],
  providers: [BaseRepository, PetRepository],
  exports: [PetRepository],
})
export class PetsModule {}
