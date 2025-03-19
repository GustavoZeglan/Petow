import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { CommonSchema } from "@architecture/schemas/CommonSchema";
import { ProviderServiceSchema } from "@services/schemas/providerServiceSchema";
import ProviderServiceEntity from "@architecture/entities/provider_service.entity";

@JoiSchemaOptions({ allowUnknown: false })
export class ListProviderServiceDTO {
  @JoiSchema(ProviderServiceSchema.select.optional())
  @ApiProperty({
    description: "Colunas que serão selecionadas",
    required: false,
  })
  select?: FindOptionsSelect<ProviderServiceEntity>;

  @JoiSchema(ProviderServiceSchema.includes.optional())
  includes?: string[];
}
