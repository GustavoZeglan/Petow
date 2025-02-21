import * as Joi from "joi";
import { CommonSchema } from "@architecture/schemas/CommonSchema";

export class ServiceSchema {
  static type = CommonSchema.text;
  static hasPath = CommonSchema.boolean;
  static isUnitary = CommonSchema.boolean;

  static order = Joi.object({
    type: CommonSchema.order,
    createdAt: CommonSchema.order,
  });

  static filter = Joi.object({
    type: Joi.string(),
    hasPath: Joi.boolean(),
    isUnitary: Joi.boolean(),
  });

  static select = Joi.object({
    id: Joi.string(),
    type: Joi.string(),
    hasPath: Joi.boolean(),
    isUnitary: Joi.boolean(),
  });
}
