import BreedEntity from "@pets/entities/breed.entity";

export default class BreedDTO {
  id: number;
  apiId: number;
  name: string;
  breedFor: string;
  temperament: string;
  lifeSpan: string;
  weight: string;
  height: string;

  constructor(
    id: number,
    apiId: number,
    name: string,
    breedFor: string,
    temperament: string,
    lifeSpan: string,
    weight: string,
    height: string,
  ) {
    this.id = id;
    this.apiId = apiId;
    this.name = name;
    this.breedFor = breedFor;
    this.temperament = temperament;
    this.lifeSpan = lifeSpan;
    this.weight = weight;
    this.height = height;
  }

  static fromEntity(entity: BreedEntity) {
    return new BreedDTO(
      entity.id,
      entity.apiId,
      entity.name,
      entity.breedFor,
      entity.temperament,
      entity.lifeSpan,
      entity.weight,
      entity.height,
    );
  }
}
