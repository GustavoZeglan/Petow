import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { AddressSchema } from "@users/schemas/addressSchema";

@JoiSchemaOptions({ allowUnknown: false })
export class CreateAddressDTO {
  @JoiSchema(AddressSchema.street.required())
  @ApiProperty({
    description: "street",
    example: "Avenida Paulista",
  })
  street: string;

  @JoiSchema(AddressSchema.number.required())
  @ApiProperty({
    description: "number",
    example: "1000",
  })
  number: string;

  @JoiSchema(AddressSchema.city.required())
  @ApiProperty({
    description: "city",
    example: "São Paulo",
  })
  city: string;

  @JoiSchema(AddressSchema.state.required())
  @ApiProperty({
    description: "state",
    example: "SP",
  })
  state: string;

  @JoiSchema(AddressSchema.zipcode.required())
  @ApiProperty({
    description: "zipCode",
    example: "01310-100",
  })
  zipcode: string;

  @JoiSchema(AddressSchema.latitude.required())
  @ApiProperty({
    description: "latitude",
    example: -23.563043,
  })
  latitude: number;

  @JoiSchema(AddressSchema.longitude.required())
  @ApiProperty({
    description: "longitude",
    example: -46.656525,
  })
  longitude: number;

  @JoiSchema(AddressSchema.placeId.required())
  @ApiProperty({
    description: "placeId",
  })
  placeId: string;
}
