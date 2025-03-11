import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { CommonSchema } from "@architecture/schemas/CommonSchema";
import { PetSchema } from "../schemas/petSchema";
import PetEntity from "@architecture/entities/pet.entity";

@JoiSchemaOptions({ allowUnknown: false })
export class ListPetsDTO {
  @JoiSchema(PetSchema.order.optional())
  @ApiProperty({ description: "Colunas de ordenação", required: false })
  order?: FindOptionsOrder<PetEntity>;

  @JoiSchema(PetSchema.filter.optional())
  @ApiProperty({ description: "Condições para seleção", required: false })
  filter?: FindOptionsWhere<PetEntity>;

  @JoiSchema(PetSchema.select.optional())
  @ApiProperty({
    description: "Colunas que serão selecionadas",
    required: false,
  })
  select?: FindOptionsSelect<PetEntity>;

  @JoiSchema(PetSchema.includes.optional())
  includes?: string[];

  @ApiProperty({ description: "Número da página", required: false })
  @JoiSchema(CommonSchema.page.optional())
  page?: number;

  @ApiProperty({ description: "Tamanho da página", required: false })
  @JoiSchema(CommonSchema.pageSize.optional())
  pageSize?: number;
}
