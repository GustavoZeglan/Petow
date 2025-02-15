import { JoiSchemaOptions, JoiSchema } from "nestjs-joi";
import * as Joi from "joi";

@JoiSchemaOptions({ allowUnknown: false })
export class CreateProviderServiceDTO {
  @JoiSchema(Joi.required())
  price: number

  @JoiSchema(Joi.number().required())
  service_id: number
}
