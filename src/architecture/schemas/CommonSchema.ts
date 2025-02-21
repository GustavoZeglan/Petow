import * as Joi from "joi";

export class CommonSchema {
  static text = Joi.string().min(1).trim();
  static number = Joi.number();
  static boolean = Joi.boolean();
  static order = Joi.string().valid("asc", "desc");
  static page = Joi.number().positive();
  static pageSize = Joi.number().positive();
}
