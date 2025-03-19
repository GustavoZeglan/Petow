import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import ProviderServiceEntity from "./provider_service.entity";
import ServiceOrderEntity from "./service_order.entity";
import FeedbackEntity from "@architecture/entities/feedback.entity";

@Entity("service_provided")
export default class ServiceProvidedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column({ type: "timestamp", name: "start_date" })
  startDate: Date;

  @Column({ type: "timestamp", name: "end_date", nullable: true })
  endDate: Date;

  @Column({ name: "is_done", type: "boolean", default: false })
  isDone: boolean;

  @Column({ name: "is_started", type: "boolean", default: false })
  isStarted: boolean;

  @OneToOne(
    () => ProviderServiceEntity,
    (providerService) => providerService.serviceProvided,
  )
  @JoinColumn({ name: "provider_service_id" })
  providerService: ProviderServiceEntity;

  @OneToOne(
    () => ServiceOrderEntity,
    (serviceOrder) => serviceOrder.serviceProvided,
  )
  @JoinColumn({ name: "service_order_id" })
  serviceOrder: ServiceOrderEntity;

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.serviceProvided)
  feedbacks: FeedbackEntity[];

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;

  toModel<T extends Partial<ServiceProvidedEntity>>() {
    return Object.assign(this, {
      providerService: this.providerService?.toModel(),
      serviceOrder: this.serviceOrder?.toModel(),
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    });
  }
}
