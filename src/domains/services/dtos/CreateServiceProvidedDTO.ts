import { ApiProperty } from "@nestjs/swagger";
import * as Joi from "joi";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";

@JoiSchemaOptions({ allowUnknown: false })
export class CreateServiceProvidedDTO {
  @ApiProperty({
    description: "Provider service ID",
    example: 1,
  })
  @JoiSchema(Joi.required())
  providerServiceId: number;

  @ApiProperty({
    description: "Service Order ID",
    example: 1,
  })
  @JoiSchema(Joi.required())
  serviceOrderId: number;

  @ApiProperty({
    description: "Price",
    example: 64,
  })
  @JoiSchema(Joi.required())
  price: number;

  @ApiProperty({
    description: "Start Date",
    example: "2025-02-20T17:30:49.920Z",
  })
  @JoiSchema(Joi.date().iso().required())
  startDate: Date;
}
