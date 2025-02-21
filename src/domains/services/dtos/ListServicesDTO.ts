import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { ServiceSchema } from "@services/schemas/serviceSchema";
import ServiceEntity from "@architecture/entities/service.entity";
import { CommonSchema } from "@architecture/schemas/CommonSchema";

@JoiSchemaOptions({ allowUnknown: false })
export class ListServicesDTO {
  @JoiSchema(ServiceSchema.order.optional())
  @ApiProperty({ description: "Colunas de ordenação", required: false })
  order?: FindOptionsOrder<ServiceEntity>;

  @JoiSchema(ServiceSchema.filter.optional())
  @ApiProperty({ description: "Condições para seleção", required: false })
  filter?: FindOptionsWhere<ServiceEntity>;

  @JoiSchema(ServiceSchema.select.optional())
  @ApiProperty({
    description: "Colunas que serão selecionadas",
    required: false,
  })
  select?: FindOptionsSelect<ServiceEntity>;

  @ApiProperty({ description: "Número da página", required: false })
  @JoiSchema(CommonSchema.page.optional())
  page?: number;

  @ApiProperty({ description: "Tamanho da página", required: false })
  @JoiSchema(CommonSchema.pageSize.optional())
  pageSize?: number;
}
