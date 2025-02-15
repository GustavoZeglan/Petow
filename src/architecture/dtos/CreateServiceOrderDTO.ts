import * as Joi from "joi";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";

@JoiSchemaOptions({ allowUnknown: false })
export class CreateServiceOrderDTO {

  @JoiSchema(Joi.required())
  service_id: number

  @JoiSchema(Joi.required())
  provider_id: number
   
  @JoiSchema(Joi.required())
  customer_id: number

  @JoiSchema(Joi.required())
  address_id: number

  @JoiSchema(Joi.required())
  duration_minutes: number

  @JoiSchema(Joi.array<number>().required())
  pets: number[]

}
