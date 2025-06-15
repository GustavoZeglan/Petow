import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { PetSchema } from "@pets/schemas/petSchema";
import { ApiProperty } from "@nestjs/swagger";
import { PetSize } from "@architecture/enums/pet-size.enum";

@JoiSchemaOptions({ allowUnknown: false })
export class UpdatePetDTO {
  @JoiSchema(PetSchema.petName.optional())
  @ApiProperty({
    description: "Name",
  })
  petName: string;

  @JoiSchema(PetSchema.birthday.optional())
  @ApiProperty({
    description: "Birthday",
  })
  birthday: Date;

  @JoiSchema(PetSchema.size.optional())
  @ApiProperty({
    description: "Size",
  })
  size: PetSize;

  @JoiSchema(PetSchema.comments.optional())
  @ApiProperty({
    description: "Comments",
  })
  comments: string;

  @JoiSchema(PetSchema.image.optional())
  @ApiProperty({
    description: "File name on minio",
  })
  image: string;

  @JoiSchema(PetSchema.specieId.optional())
  @ApiProperty({
    description: "Specie ID",
    example: 1,
  })
  specieId: number;

  @JoiSchema(PetSchema.breedId.optional())
  @ApiProperty({
    description: "Breed ID",
    example: 1,
  })
  breedId: number;
}
