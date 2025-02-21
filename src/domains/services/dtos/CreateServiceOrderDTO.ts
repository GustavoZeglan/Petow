import { ApiProperty } from "@nestjs/swagger";
import * as Joi from "joi";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";

@JoiSchemaOptions({ allowUnknown: false })
export class CreateServiceOrderDTO {
  @JoiSchema(Joi.required())
  @ApiProperty({
    description: "Service ID",
    example: 1,
  })
  serviceId: number;

  @JoiSchema(Joi.required())
  @ApiProperty({
    description: "Provider ID",
    example: 1,
  })
  providerId: number;

  @JoiSchema(Joi.required())
  @ApiProperty({
    description: "Customer ID",
    example: 1,
  })
  customerId: number;

  @JoiSchema(Joi.required())
  @ApiProperty({
    description: "Address ID",
    example: 1,
  })
  addressId: number;

  @JoiSchema(Joi.required())
  @ApiProperty({
    description: "Service duration in minutes",
    example: 30,
  })
  durationMinutes: number;

  @JoiSchema(Joi.array<number>().required())
  @ApiProperty({
    description: "Pets IDs",
    example: [1, 2, 3],
  })
  pets: number[];
}
