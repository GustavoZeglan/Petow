import { CommonSchema } from "@architecture/schemas/CommonSchema";
import * as Joi from "joi";

const AddressIncludeValues = ["users"] as const;

export class AddressSchema {
  static street = CommonSchema.text.max(255);
  static number = CommonSchema.text.max(10);
  static city = CommonSchema.text.max(100);
  static state = CommonSchema.text.max(20);
  static zipcode = CommonSchema.text.max(10);
  static latitude = CommonSchema.number;
  static longitude = CommonSchema.number;
  static placeId = CommonSchema.text;

  static includes = Joi.array()
    .items(Joi.string().valid(...AddressIncludeValues))
    .single()
    .optional();

  static order = Joi.object({
    createdAt: CommonSchema.order,
  });

  static filter = Joi.object({
    email: CommonSchema.text.email(),
  });

  static select = Joi.object({
    id: CommonSchema.number,
    placeId: CommonSchema.number,
    street: CommonSchema.text,
    number: CommonSchema.text,
    city: CommonSchema.text,
    state: CommonSchema.text,
    zipCode: CommonSchema.text,
    latitude: CommonSchema.number,
    longitude: CommonSchema.number,
  });
}
