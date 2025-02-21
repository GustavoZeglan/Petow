import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { ServiceOrderSchema } from "@services/schemas/serviceOrderSchema";

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateServiceOrderDTO {
  @JoiSchema(ServiceOrderSchema.isAccepted.optional())
  isAccepted?: boolean;

  @JoiSchema(ServiceOrderSchema.isDone.optional())
  isDone?: boolean;

  @JoiSchema(ServiceOrderSchema.isStarted.optional())
  isStarted?: boolean;

  @JoiSchema(ServiceOrderSchema.isCanceled.optional())
  isCanceled?: boolean;
}
