import { JoiSchemaOptions, JoiSchema } from "nestjs-joi";
import * as Joi from "joi";
import { ApiProperty } from "@nestjs/swagger";

@JoiSchemaOptions({ allowUnknown: false })
export class CreateProviderServiceDTO {
  @JoiSchema(Joi.required())
  @ApiProperty({
    description: "Price",
    example: 1,
  })
  price: number;

  @JoiSchema(Joi.number().required())
  @ApiProperty({
    description: "Service ID",
    example: 1,
  })
  serviceId: number;
}
