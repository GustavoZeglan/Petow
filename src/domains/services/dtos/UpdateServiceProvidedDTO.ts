import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { ServiceProvidedSchema } from "@services/schemas/serviceProvidedSchema";

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateServiceProvidedDTO {
  @JoiSchema(ServiceProvidedSchema.isDone.optional())
  isDone?: boolean;

  @JoiSchema(ServiceProvidedSchema.isStarted.optional())
  isStarted?: boolean;
}
