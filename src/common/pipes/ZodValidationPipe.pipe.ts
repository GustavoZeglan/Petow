import { BadRequestException } from "@nestjs/common";
import { ZodSchema } from "zod";

export class ZodValidationPipe {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: any) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException({
        message: "Validation failed",
        fields: error.errors,
      });
    }
  }
}
