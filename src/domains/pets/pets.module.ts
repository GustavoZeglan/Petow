import { forwardRef, Module } from "@nestjs/common";
import PetEntity from "@architecture/entities/pet.entity";
import BreedEntity from "@architecture/entities/breed.entity";
import { BaseRepository } from "@architecture/repositories/base.repository";
import PetRepository from "@architecture/repositories/pet.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BreedsController } from '@pets/controllers/breeds.controller';
import { BreedsService } from '@pets/services/breeds.service';
import { SpeciesController } from '@pets/controllers/species.controller';
import { SpeciesService } from '@pets/services/species.service';
import { PetsController } from '@pets/controllers/pets.controller';
import { PetsService } from '@pets/services/pets.service';
import SpeciesRepository from "@architecture/repositories/species.repository";
import BreedRepository from "@architecture/repositories/breed.repository";
import SpeciesEntity from "@architecture/entities/species.entity";
import { UsersModule } from "../users/users.module";
  
@Module({
  imports: [ 
    TypeOrmModule.forFeature([PetEntity, BreedEntity, SpeciesEntity]),
    forwardRef(() => UsersModule),
  ],
  controllers: [BreedsController, SpeciesController, PetsController],
  providers: [BaseRepository, PetRepository, BreedsService, BreedRepository, SpeciesRepository, SpeciesService, PetsService],
  exports: [PetRepository],
})
export class PetsModule {}
