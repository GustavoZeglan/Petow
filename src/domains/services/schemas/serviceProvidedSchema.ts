import * as Joi from "joi";
import { CommonSchema } from "@architecture/schemas/CommonSchema";

const ServiceProvidedIncludeValues = [
  "serviceOrder",
  "providerService",
] as const;

export class ServiceProvidedSchema {
  static price = CommonSchema.number;
  static isDone = CommonSchema.boolean;
  static isStarted = CommonSchema.boolean;

  static order = Joi.object({
    startDate: CommonSchema.order,
    endDate: CommonSchema.order,
    createdAt: CommonSchema.order,
  });

  static includes = Joi.array()
    .items(Joi.string().valid(...ServiceProvidedIncludeValues))
    .single()
    .optional();

  static filter = Joi.object({
    isDone: Joi.boolean(),
    isStarted: Joi.boolean(),
  });

  static select = Joi.object({
    id: Joi.string(),
    price: Joi.number(),
    isDone: Joi.boolean(),
    isStarted: Joi.boolean(),
    startDate: Joi.date(),
    endDate: Joi.date(),
  });
}
