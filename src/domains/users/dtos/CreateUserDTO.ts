import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { UserSchema } from "@users/schemas/userSchema";

@JoiSchemaOptions({ allowUnknown: false })
export class CreateUserDTO {
  @JoiSchema(UserSchema.userName.required())
  @ApiProperty({
    description: "username",
    example: "João Salvi Silva(Receba)",
  })
  name: string;

  @JoiSchema(UserSchema.description.optional())
  description?: string;

  @JoiSchema(UserSchema.cpf.required())
  @ApiProperty({
    description: "cpf",
    example: "12345678910",
  })
  cpf: string;

  @JoiSchema(UserSchema.email.required())
  @ApiProperty({
    description: "email",
    example: "jsalvi@gmail.com",
  })
  email: string;

  @JoiSchema(UserSchema.phone.required())
  @ApiProperty({
    description: "phone",
    example: "5511999999999",
  })
  phone: string;

  @JoiSchema(UserSchema.password.required())
  @ApiProperty({
    description: "password",
    example: "12345678",
  })
  password: string;

  @JoiSchema(UserSchema.userType.required())
  @ApiProperty({
    description: "User type",
    example: "1 for user and 2 for tutor",
  })
  userType: number;
}
