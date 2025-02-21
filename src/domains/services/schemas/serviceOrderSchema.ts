import * as Joi from "joi";
import { CommonSchema } from "@architecture/schemas/CommonSchema";

const ServiceOrderIncludeValues = [
  "service",
  "customer",
  "provider",
  "address",
] as const;

export class ServiceOrderSchema {
  static isAccepted = CommonSchema.boolean;
  static isCanceled = CommonSchema.boolean;
  static isDone = CommonSchema.boolean;
  static isStarted = CommonSchema.boolean;

  static order = Joi.object({
    expectedDate: CommonSchema.order,
    createdAt: CommonSchema.order,
  });

  static includes = Joi.array()
    .items(Joi.string().valid(...ServiceOrderIncludeValues))
    .single()
    .optional();

  static filter = Joi.object({
    isAccepted: Joi.boolean(),
    isDone: Joi.boolean(),
    isStarted: Joi.boolean(),
    isCanceled: Joi.boolean(),
  });

  static select = Joi.object({
    id: Joi.string(),
    isAccepted: Joi.boolean(),
    isDone: Joi.boolean(),
    isStarted: Joi.boolean(),
    isCanceled: Joi.boolean(),
    expectedDate: Joi.date(),
  });
}
