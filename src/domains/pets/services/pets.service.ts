import PetRepository from "@architecture/repositories/pet.repository";
import SpeciesRepository from "@architecture/repositories/species.repository";
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreatePetDTO } from "@pets/dtos/CreatePetDTO";
import BreedRepository from "@architecture/repositories/breed.repository";
import UserRepository from "@architecture/repositories/user.repository";
import { UpdatePetDTO } from "@pets/dtos/UpdatePetDTO";

@Injectable()
export class PetsService {
  constructor(
    private readonly petsRepository: PetRepository,
    private readonly usersRepository: UserRepository,
    private readonly breedsRepository: BreedRepository,
    private readonly speciesRepository: SpeciesRepository,
  ) {}

  async createPet(createPetDTO: CreatePetDTO, userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const specie = await this.speciesRepository.findOneBy({
      id: createPetDTO.specieId,
    });
    if (!specie) {
      throw new NotFoundException("Specie not found");
    }

    const breed = await this.breedsRepository.findOneBy({
      id: createPetDTO.breedId,
    });
    if (!breed) {
      throw new NotFoundException("Breed not found");
    }

    const petToCreate = this.petsRepository.create({
      ...createPetDTO,
      petName: createPetDTO.name,
      specie,
      breed,
      user,
    });

    const pet = await this.petsRepository.save(petToCreate);
    return pet.toModel();
  }

  async getPets(userId: number) {
    const pets = await this.petsRepository.findPets(userId);
    return pets.map((pet) => pet.toModel());
  }

  async getPet(petId: number) {
    const pet = await this.petsRepository.findPetById(petId);

    if (!pet) throw new NotFoundException("Pet not found");

    return pet.toModel();
  }

  async updatePet(updatePetDTO: UpdatePetDTO, userId: number, petId: number) {
    const pet = await this.petsRepository.findOne({
      where: { id: petId },
      relations: ["user"],
    });
    if (!pet) {
      throw new NotFoundException("Pet not found");
    }

    if (pet.user.id !== userId) {
      throw new UnauthorizedException("You are not allowed to update this pet");
    }

    if (updatePetDTO.breedId) {
      const breed = await this.breedsRepository.findOneBy({
        id: updatePetDTO.breedId,
      });
      if (!breed) {
        throw new NotFoundException("Breed not found");
      }
      pet.breed = breed;
    }

    if (updatePetDTO.specieId) {
      const specie = await this.speciesRepository.findOneBy({
        id: updatePetDTO.specieId,
      });
      if (!specie) {
        throw new NotFoundException("Specie not found");
      }
      pet.specie = specie;
    }

    Object.assign(pet, updatePetDTO);

    await this.petsRepository.save(pet);
  }

  async deletePet(userId: number, petId: number) {
    const pet = await this.petsRepository.findOne({
      where: { id: petId },
      relations: ["user"],
    });
    if (!pet) {
      throw new NotFoundException("Pet not found");
    }
    if (pet.user.id !== userId) {
      throw new UnauthorizedException("You are not allowed to delete this pet");
    }
    await this.petsRepository.delete({ id: petId });
  }
}
