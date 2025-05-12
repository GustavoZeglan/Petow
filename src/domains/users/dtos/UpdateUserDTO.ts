import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { UserSchema } from "@users/schemas/userSchema";

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateUserDTO {
  @JoiSchema(UserSchema.userName.optional())
  @ApiProperty({
    description: "username",
    example: "João Salvi Silva(Receba)",
  })
  name: string;

  @JoiSchema(UserSchema.phone.optional())
  @ApiProperty({
    description: "phone",
    example: "5511999999999",
  })
  phone: string;

  @JoiSchema(UserSchema.email.optional())
  @ApiProperty({
    description: "email",
    example: "jsalvi@gmail.com",
  })
  email: string;

  @JoiSchema(UserSchema.image.optional())
  @ApiProperty({
    description: "File name on minio",
  })
  image: string;
}
