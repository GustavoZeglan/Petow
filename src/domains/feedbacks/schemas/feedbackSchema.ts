import * as Joi from "joi";
import { CommonSchema } from "@architecture/schemas/CommonSchema";
import { FeedbackTypeEnum } from "@architecture/enums/feedback-type.enum";

const FeedbackIncludeValues = [
  "sender",
  "receiver",
  "pet",
  "serviceProvided",
  "feedbackType",
] as const;

export class FeedbackSchema {
  static description = CommonSchema.text;
  static rating = CommonSchema.number.min(0).max(5);
  static receiverId = CommonSchema.number;
  static petId = CommonSchema.number.optional();
  static serviceProvidedId = CommonSchema.number;

  static feedbackType = Joi.alternatives().conditional("petId", {
    is: Joi.exist(),
    then: Joi.valid(FeedbackTypeEnum.PET_RATING),
    otherwise: Joi.valid(
      FeedbackTypeEnum.USER_RATING,
      FeedbackTypeEnum.PET_RATING,
    ),
  });

  static order = Joi.object({
    createdAt: CommonSchema.order,
  });

  static includes = Joi.array()
    .items(Joi.string().valid(...FeedbackIncludeValues))
    .single()
    .optional();

  static filter = Joi.object({
    description: Joi.string(),
    rating: Joi.number().min(0).max(5),
    serviceProvided: Joi.number(),
  });

  static select = Joi.object({
    description: Joi.string(),
    rating: Joi.number(),
  });
}
