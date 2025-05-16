import * as Joi from "joi";
import { CommonSchema } from "@architecture/schemas/CommonSchema";

const providerServiceIncludeValues = ["service", "provider"] as const;

export class ProviderServiceSchema {
  static price = CommonSchema.number;
  static order = Joi.string().valid("ASC", "DESC").optional();
  static providerName = CommonSchema.text.optional();

  static includes = Joi.array()
    .items(Joi.string().valid(...providerServiceIncludeValues))
    .single()
    .optional();

  static filter = Joi.object({
    price: Joi.number(),
  });

  static select = Joi.object({
    id: Joi.string(),
    price: Joi.number(),
  });
}
