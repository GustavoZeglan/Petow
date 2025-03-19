import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { FeedbackSchema } from "@feedbacks/schemas/feedbackSchema";

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateFeedbackDTO {
  @JoiSchema(FeedbackSchema.description.optional())
  description?: string;

  @JoiSchema(FeedbackSchema.rating.optional())
  rating?: number;
}
