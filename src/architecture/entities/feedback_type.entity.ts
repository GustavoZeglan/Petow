import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import FeedbackEntity from "@architecture/entities/feedback.entity";

@Entity("feedback_type")
export default class FeedbackTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", length: 100 })
  type: string;

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.feedbackType)
  feedbacks: FeedbackEntity[];

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  toModel<T extends Partial<FeedbackTypeEntity>>() {
    return Object.assign(this, {
      feedbacks: this?.feedbacks?.map((feedback) =>
        feedback.toModel<FeedbackEntity>(),
      ),
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    });
  }
}
