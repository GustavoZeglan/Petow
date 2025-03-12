import * as Joi from "joi";
import { CommonSchema } from "@architecture/schemas/CommonSchema";

const BreedIncludeValues = ["specie", "pets"] as const;

export class BreedSchema {
  static order = Joi.object({
    createdAt: CommonSchema.order,
  });

  static includes = Joi.array()
    .items(Joi.string().valid(...BreedIncludeValues))
    .single()
    .optional();

  static filter = Joi.object({
    name: Joi.string(),
    temperament: Joi.string(),
    lifeSpan: Joi.string(),
    weight: Joi.string(),
    specie: Joi.number(),
  });

  static select = Joi.object({
    id: Joi.string(),
    name: Joi.string(),
    temperament: Joi.string(),
    lifeSpan: Joi.string(),
    weight: Joi.string(),
  });
}
