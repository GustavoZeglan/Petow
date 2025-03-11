import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { CommonSchema } from "@architecture/schemas/CommonSchema";
import { BreedSchema } from "@pets/schemas/breedSchema";
import BreedEntity from "@architecture/entities/breed.entity";

@JoiSchemaOptions({ allowUnknown: false })
export class ListBreedsDTO {
  @JoiSchema(BreedSchema.order.optional())
  @ApiProperty({ description: "Colunas de ordenação", required: false })
  order?: FindOptionsOrder<BreedEntity>;

  @JoiSchema(BreedSchema.filter.optional())
  @ApiProperty({ description: "Condições para seleção", required: false })
  filter?: FindOptionsWhere<BreedEntity>;

  @JoiSchema(BreedSchema.select.optional())
  @ApiProperty({
    description: "Colunas que serão selecionadas",
    required: false,
  })
  select?: FindOptionsSelect<BreedEntity>;

  @JoiSchema(BreedSchema.includes.optional())
  includes?: string[];

  @ApiProperty({ description: "Número da página", required: false })
  @JoiSchema(CommonSchema.page.optional())
  page?: number;

  @ApiProperty({ description: "Tamanho da página", required: false })
  @JoiSchema(CommonSchema.pageSize.optional())
  pageSize?: number;
}
