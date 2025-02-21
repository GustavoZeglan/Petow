import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { ProviderServiceSchema } from "@services/schemas/providerServiceSchema";

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateProviderServiceDTO {
  @JoiSchema(ProviderServiceSchema.price.optional())
  price?: number;
}
