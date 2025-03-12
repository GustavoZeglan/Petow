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

  @Column({ type: "varchar", length: 100 })
  type: string;

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.feedbackType)
  feedbacks: FeedbackEntity[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
