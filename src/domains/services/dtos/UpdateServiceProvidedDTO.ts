import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { ServiceProvidedSchema } from "@services/schemas/serviceProvidedSchema";
import { CommonSchema } from "@architecture/schemas/CommonSchema";

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateServiceProvidedDTO {
  @JoiSchema(ServiceProvidedSchema.isDone.optional())
  isDone?: boolean;

  @JoiSchema(ServiceProvidedSchema.isStarted.optional())
  isStarted?: boolean;

  @JoiSchema(CommonSchema.text.optional())
  startDate?: boolean;

  @JoiSchema(CommonSchema.text.optional())
  endDate?: boolean;
}
