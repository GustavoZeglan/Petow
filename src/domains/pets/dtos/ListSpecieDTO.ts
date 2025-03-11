import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { CommonSchema } from "@architecture/schemas/CommonSchema";
import { SpeciesSchema } from "../schemas/speciesSchema";
import SpeciesEntity from "@architecture/entities/species.entity";

@JoiSchemaOptions({ allowUnknown: false })
export class ListSpeciesDTO {
  @JoiSchema(SpeciesSchema.order.optional())
  @ApiProperty({ description: "Colunas de ordenação", required: false })
  order?: FindOptionsOrder<SpeciesEntity>;

  @JoiSchema(SpeciesSchema.filter.optional())
  @ApiProperty({ description: "Condições para seleção", required: false })
  filter?: FindOptionsWhere<SpeciesEntity>;

  @JoiSchema(SpeciesSchema.select.optional())
  @ApiProperty({
    description: "Colunas que serão selecionadas",
    required: false,
  })
  select?: FindOptionsSelect<SpeciesEntity>;

  @JoiSchema(SpeciesSchema.includes.optional())
  includes?: string[];

  @ApiProperty({ description: "Número da página", required: false })
  @JoiSchema(CommonSchema.page.optional())
  page?: number;

  @ApiProperty({ description: "Tamanho da página", required: false })
  @JoiSchema(CommonSchema.pageSize.optional())
  pageSize?: number;
}
