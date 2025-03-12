import { CommonSchema } from "@architecture/schemas/CommonSchema";

export default class LoginSchema {
  email = CommonSchema.text.email().required();
  password = CommonSchema.text.required();
}
