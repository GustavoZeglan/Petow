import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { CommonSchema } from "@architecture/schemas/CommonSchema";
import { ServiceOrderSchema } from "@app/domains/services/schemas/serviceOrderSchema";
import ServiceOrderEntity from "@architecture/entities/service_order.entity";
import { UserTypeEnum } from "@architecture/enums/user-type.enum";

@JoiSchemaOptions({ allowUnknown: false })
export class ListServiceOrderDTO {
  @JoiSchema(
    CommonSchema.text
      .valid(UserTypeEnum.CUSTOMER, UserTypeEnum.PROVIDER)
      .optional(),
  )
  @ApiProperty({ description: "Tipo de usuário", required: false })
  role: string;

  @JoiSchema(ServiceOrderSchema.order.optional())
  @ApiProperty({ description: "Colunas de ordenação", required: false })
  order?: FindOptionsOrder<ServiceOrderEntity>;

  @ApiProperty({ description: "Número da página", required: false })
  @JoiSchema(CommonSchema.page.optional())
  page?: number;

  @ApiProperty({ description: "Tamanho da página", required: false })
  @JoiSchema(CommonSchema.pageSize.optional())
  pageSize?: number;
}
