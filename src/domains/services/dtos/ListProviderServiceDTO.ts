import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { CommonSchema } from "@architecture/schemas/CommonSchema";
import { ProviderServiceSchema } from "@services/schemas/providerServiceSchema";
import ProviderServiceEntity from "@architecture/entities/provider_service.entity";

@JoiSchemaOptions({ allowUnknown: false })
export class ListProviderServiceDTO {
  @JoiSchema(ProviderServiceSchema.order.optional())
  @ApiProperty({ description: "Colunas de ordenação", required: false })
  order?: FindOptionsOrder<ProviderServiceEntity>;

  @JoiSchema(ProviderServiceSchema.filter.optional())
  @ApiProperty({ description: "Condições para seleção", required: false })
  filter?: FindOptionsWhere<ProviderServiceEntity>;

  @JoiSchema(ProviderServiceSchema.select.optional())
  @ApiProperty({
    description: "Colunas que serão selecionadas",
    required: false,
  })
  select?: FindOptionsSelect<ProviderServiceEntity>;

  @JoiSchema(ProviderServiceSchema.includes.optional())
  includes?: string[];

  @ApiProperty({ description: "Número da página", required: false })
  @JoiSchema(CommonSchema.page.optional())
  page?: number;

  @ApiProperty({ description: "Tamanho da página", required: false })
  @JoiSchema(CommonSchema.pageSize.optional())
  pageSize?: number;
}
