import { CommonSchema } from "@architecture/schemas/CommonSchema";
import { cpf } from "cpf-cnpj-validator";
import * as Joi from "joi";

const UserIncludeValues = ["userType"] as const;

const cpfSchema = Joi.string().custom((value, helpers) => {
  if (!cpf.isValid(value)) {
    return helpers.error("any.invalid", { message: "CPF is invalid" });
  }
  return value;
}, "CPF Validation");

const phoneRegex = /^(?:\+55)?(?:\d{2})?\d{8,9}$/;
const phoneSchema = Joi.string()
  .pattern(phoneRegex)
  .message("Phone Number is invalid");

export class UserSchema {
  static userName = CommonSchema.text;
  static email = CommonSchema.text.email();
  static phone = phoneSchema;
  static cpf = cpfSchema;
  static password = CommonSchema.text;
  static userType = CommonSchema.number.valid(1, 2);
  static image = CommonSchema.text;

  static includes = Joi.array()
    .items(Joi.string().valid(...UserIncludeValues))
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
    userName: CommonSchema.text,
    email: CommonSchema.text.email(),
  });
}
