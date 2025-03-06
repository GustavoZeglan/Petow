import { JoiSchemaOptions, JoiSchema } from "nestjs-joi";
import { ApiProperty } from "@nestjs/swagger";
import LoginSchema from "@auth/schemas/loginSchema";

@JoiSchemaOptions({ allowUnknown: false })
export class LoginDTO {
  @JoiSchema(new LoginSchema().email)
  @ApiProperty({
    description: "email",
  })
  email: string;

  @JoiSchema(new LoginSchema().password)
  @ApiProperty({
    description: "Password",
  })
  password: string;
}
