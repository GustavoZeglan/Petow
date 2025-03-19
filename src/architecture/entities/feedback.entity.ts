import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import UserEntity from "@architecture/entities/user.entity";
import FeedbackTypeEntity from "@architecture/entities/feedback_type.entity";
import ServiceProvidedEntity from "@architecture/entities/service_provided.entity";
import PetEntity from "@architecture/entities/pet.entity";

@Entity("feedback")
export default class FeedbackEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "int", default: 0 })
  rating: number;

  @ManyToOne(() => UserEntity, (sender) => sender.feedbacksSender)
  @JoinColumn({ name: "sender_user_id" })
  sender: UserEntity;

  @ManyToOne(() => UserEntity, (receiver) => receiver.feedbacksReceiver)
  @JoinColumn({ name: "receiver_user_id" })
  receiver: UserEntity;

  @ManyToOne(() => FeedbackTypeEntity, (feedbackType) => feedbackType.feedbacks)
  @JoinColumn({ name: "feedback_type_id" })
  feedbackType: FeedbackTypeEntity;

  @ManyToOne(
    () => ServiceProvidedEntity,
    (serviceProvided) => serviceProvided.feedbacks,
  )
  @JoinColumn({ name: "service_provided_id" })
  serviceProvided: ServiceProvidedEntity;

  @ManyToOne(() => PetEntity, (pet) => pet.feedbacks)
  @JoinColumn({ name: "pet_id" })
  pet: PetEntity;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;

  toModel<T extends Partial<FeedbackEntity>>() {
    return Object.assign(this, {
      sender: this?.sender?.toModel(),
      receiver: this?.receiver?.toModel(),
      feedbackType: this?.feedbackType?.toModel(),
      serviceProvided: this?.serviceProvided?.toModel(),
      pet: this?.pet?.toModel(),
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    });
  }
}
