import { JoiSchemaOptions, JoiSchema } from "nestjs-joi";
import { ApiProperty } from "@nestjs/swagger";
import { FeedbackSchema } from "@feedbacks/schemas/feedbackSchema";
import { FeedbackTypeEnum } from "@architecture/enums/feedback-type.enum";

@JoiSchemaOptions({ allowUnknown: false })
export class CreateFeedbackDTO {
  @JoiSchema(FeedbackSchema.description.required())
  @ApiProperty({
    description: "description",
  })
  description: string;

  @JoiSchema(FeedbackSchema.rating.required())
  @ApiProperty({
    description: "rating",
  })
  rating: number;

  @JoiSchema(FeedbackSchema.receiverId.required())
  @ApiProperty({
    description: "receiverId",
  })
  receiverId: number;

  @JoiSchema(FeedbackSchema.petId)
  @ApiProperty({
    description: "petId",
  })
  petId: number;

  @JoiSchema(FeedbackSchema.serviceProvidedId.required())
  @ApiProperty({
    description: "serviceProvidedId",
  })
  serviceProvidedId: number;

  @JoiSchema(FeedbackSchema.feedbackType.required())
  @ApiProperty({
    description: "feedbackType",
  })
  feedbackType: FeedbackTypeEnum;
}
