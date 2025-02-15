import PetEntity from "@pets/entities/pet.entity";
import BreedDTO from "@pets/dtos/BreedDTO";

export default class PetDTO {
  id: number;
  name: string;
  birthday: Date;
  comments: string;
  breed: BreedDTO;

  constructor(
    id: number,
    name: string,
    birthday: Date,
    comments: string,
    breed: BreedDTO,
  ) {
    this.id = id;
    this.name = name;
    this.birthday = birthday;
    this.comments = comments;
    this.breed = breed;
  }

  static fromEntity(entity: PetEntity) {
    return new PetDTO(
      entity.id,
      entity.name,
      entity.birthday,
      entity.comments,
      BreedDTO.fromEntity(entity.breed),
    );
  }
}
