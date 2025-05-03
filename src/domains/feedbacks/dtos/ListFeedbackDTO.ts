import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { CommonSchema } from "@architecture/schemas/CommonSchema";
import FeedbackEntity from "@architecture/entities/feedback.entity";
import { FeedbackEntityType } from "@architecture/enums/entity.enum";
import { FeedbackSchema } from "../schemas/feedbackSchema";

@JoiSchemaOptions({ allowUnknown: false })
export class ListFeedbackDTO {
  @JoiSchema(
    CommonSchema.text
      .valid(FeedbackEntityType.PET, FeedbackEntityType.USER)
      .optional(),
  )
  @ApiProperty({ description: "Entity type (pet or user)", required: false })
  entity?: FeedbackEntityType;

  @JoiSchema(CommonSchema.order.optional())
  @ApiProperty({ description: "Order columns", required: false })
  order?: FindOptionsOrder<FeedbackEntity>;

  @ApiProperty({ description: "Page number", required: false })
  @JoiSchema(CommonSchema.page.optional())
  page?: number;

  @ApiProperty({ description: "Page size", required: false })
  @JoiSchema(CommonSchema.pageSize.optional())
  pageSize?: number;
}
