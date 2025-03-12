import * as Joi from "joi";
import { CommonSchema } from "@architecture/schemas/CommonSchema";

const SpecieIncludeValues = ["breeds", "pets"] as const;

export class SpeciesSchema {
  static order = Joi.object({
    createdAt: CommonSchema.order,
  });

  static includes = Joi.array()
    .items(Joi.string().valid(...SpecieIncludeValues))
    .single()
    .optional();

  static filter = Joi.object({
    name: Joi.string(),
  });

  static select = Joi.object({
    id: Joi.string(),
    name: Joi.string(),
  });
}
