import * as Joi from "joi";
import { CommonSchema } from "@architecture/schemas/CommonSchema";
import { PetSize } from "@architecture/enums/pet-size.enum";

const PetIncludeValues = ["user", "breed", "specie"] as const;

export class PetSchema {
  static petName = CommonSchema.text;
  static birthday = Joi.date();
  static size = Joi.string().valid(PetSize.SMALL, PetSize.MEDIUM, PetSize.BIG);
  static comments = CommonSchema.text;
  static specieId = CommonSchema.number;
  static breedId = CommonSchema.number;
  static image = CommonSchema.text;

  static order = Joi.object({
    createdAt: CommonSchema.order,
  });

  static includes = Joi.array()
    .items(Joi.string().valid(...PetIncludeValues))
    .single()
    .optional();

  static filter = Joi.object({
    name: Joi.string(),
    id: Joi.number(),
  });

  static select = Joi.object({
    id: Joi.string(),
    name: Joi.string(),
    birthday: Joi.date(),
    comments: Joi.string(),
  });
}
