import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { CommonSchema } from "@architecture/schemas/CommonSchema";
import ServiceProvidedEntity from "@architecture/entities/service_provided.entity";
import { ServiceProvidedSchema } from "@services/schemas/serviceProvidedSchema";

@JoiSchemaOptions({ allowUnknown: false })
export class ListServiceProvidedDTO {
  @JoiSchema(ServiceProvidedSchema.order.optional())
  @ApiProperty({ description: "Colunas de ordenação", required: false })
  order?: FindOptionsOrder<ServiceProvidedEntity>;

  @JoiSchema(ServiceProvidedSchema.filter.optional())
  @ApiProperty({ description: "Condições para seleção", required: false })
  filter?: FindOptionsWhere<ServiceProvidedEntity>;

  @JoiSchema(ServiceProvidedSchema.select.optional())
  @ApiProperty({
    description: "Colunas que serão selecionadas",
    required: false,
  })
  select?: FindOptionsSelect<ServiceProvidedEntity>;

  @JoiSchema(ServiceProvidedSchema.includes.optional())
  includes?: string[];

  @ApiProperty({ description: "Número da página", required: false })
  @JoiSchema(CommonSchema.page.optional())
  page?: number;

  @ApiProperty({ description: "Tamanho da página", required: false })
  @JoiSchema(CommonSchema.pageSize.optional())
  pageSize?: number;
}
