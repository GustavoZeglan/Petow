import BreedRepository from "@architecture/repositories/breed.repository";
import { Injectable } from "@nestjs/common";
import { ListBreedsDTO } from "@pets/dtos/ListBreedsDTO";

@Injectable()
export class BreedsService {
  constructor(private readonly breedRepository: BreedRepository) {}

  async getDogsBreeds() {
    const breeds = await this.breedRepository.findDogsBreeds();
    breeds.map((entity) => entity.toModel());
    return breeds;
  }

  async getCatsBreeds() {
    const breeds = await this.breedRepository.findCatsBreeds();
    breeds.map((entity) => entity.toModel());
    return breeds;
  }
}
