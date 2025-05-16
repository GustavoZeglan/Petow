import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { ProviderServiceSchema } from "@services/schemas/providerServiceSchema";
import ProviderServiceEntity from "@architecture/entities/provider_service.entity";

@JoiSchemaOptions({ allowUnknown: false })
export class GetProviderServiceDTO {
  @JoiSchema(ProviderServiceSchema.order)
  @ApiProperty({
    description:
      "Ordenação pelo preço: 'ASC' para mais barato primeiro ou 'DESC' para mais caro primeiro",
    required: false,
    enum: ["ASC", "DESC"],
    default: "ASC",
  })
  order: "ASC" | "DESC" = "ASC";

  @JoiSchema(ProviderServiceSchema.providerName)
  @ApiProperty({
    description: "Nome (ou parte dele) do prestador a ser buscado",
    required: false,
  })
  name?: string;
}
