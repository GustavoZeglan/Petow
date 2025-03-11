import BreedRepository from '@architecture/repositories/breed.repository';
import { Injectable } from '@nestjs/common';
import { ListBreedsDTO } from '@pets/dtos/ListBreedsDTO';

@Injectable()
export class BreedsService {

  constructor(
    private readonly breedRepository: BreedRepository,
  ) {}

  async getBreeds(query: ListBreedsDTO) {
    const breeds = await this.breedRepository.findMany(query)
    breeds.map(entity => entity.toModel());
    return breeds;
  }

}
