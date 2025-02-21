import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { CommonSchema } from "@architecture/schemas/CommonSchema";
import { ServiceOrderSchema } from "@app/domains/services/schemas/serviceOrderSchema";
import ServiceOrderEntity from "@architecture/entities/service_order.entity";

@JoiSchemaOptions({ allowUnknown: false })
export class ListServiceOrderDTO {
  @JoiSchema(ServiceOrderSchema.order.optional())
  @ApiProperty({ description: "Colunas de ordenação", required: false })
  order?: FindOptionsOrder<ServiceOrderEntity>;

  @JoiSchema(ServiceOrderSchema.filter.optional())
  @ApiProperty({ description: "Condições para seleção", required: false })
  filter?: FindOptionsWhere<ServiceOrderEntity>;

  @JoiSchema(ServiceOrderSchema.select.optional())
  @ApiProperty({
    description: "Colunas que serão selecionadas",
    required: false,
  })
  select?: FindOptionsSelect<ServiceOrderEntity>;

  @JoiSchema(ServiceOrderSchema.includes.optional())
  includes?: string[];

  @ApiProperty({ description: "Número da página", required: false })
  @JoiSchema(CommonSchema.page.optional())
  page?: number;

  @ApiProperty({ description: "Tamanho da página", required: false })
  @JoiSchema(CommonSchema.pageSize.optional())
  pageSize?: number;
}
