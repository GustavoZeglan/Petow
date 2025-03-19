import { JoiSchemaOptions, JoiSchema } from "nestjs-joi";
import { ApiProperty } from "@nestjs/swagger";
import { PetSchema } from "../schemas/petSchema";
import { PetSize } from "@architecture/enums/pet-size.enum";

@JoiSchemaOptions({ allowUnknown: false })
export class CreatePetDTO {
  @JoiSchema(PetSchema.petName.required())
  @ApiProperty({
    description: "Name",
  })
  name: string;

  @JoiSchema(PetSchema.birthday.required())
  @ApiProperty({
    description: "Birthday",
  })
  birthday: Date;

  @JoiSchema(PetSchema.size.required())
  @ApiProperty({
    description: "Size",
  })
  size: PetSize;

  @JoiSchema(PetSchema.comments.required())
  @ApiProperty({
    description: "Comments",
  })
  comments: string;

  @JoiSchema(PetSchema.specieId.required())
  @ApiProperty({
    description: "Specie ID",
    example: 1,
  })
  specieId: number;

  @JoiSchema(PetSchema.breedId.required())
  @ApiProperty({
    description: "Breed ID",
    example: 1,
  })
  breedId: number;
}
