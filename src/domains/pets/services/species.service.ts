import SpeciesRepository from '@architecture/repositories/species.repository';
import { Injectable } from '@nestjs/common';
import { ListSpeciesDTO } from '@pets/dtos/ListSpecieDTO';

@Injectable()
export class SpeciesService {

  constructor (
    private readonly speciesRepository: SpeciesRepository,
  ) {}

  async find(query: ListSpeciesDTO) {
    const species = await this.speciesRepository.findMany(query);
    species.map(entity => entity.toModel());
    return species;
  }

}
