import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import ServiceEntity from "@architecture/entities/service.entity";
import UserEntity from "@architecture/entities/user.entity";
import { ServiceProvidedEntity } from "@architecture/entities/service_provided.entity";

@Entity("provider_service")
export default class ProviderServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "price", type: "decimal", precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => ServiceEntity, (service) => service.providerServices)
  @JoinColumn({ name: "service_id" })
  service: ServiceEntity;

  @ManyToOne(() => UserEntity, (user) => user.providerServices)
  @JoinColumn({ name: "provider_id" })
  provider: UserEntity;

  @OneToOne(
    () => ServiceProvidedEntity,
    (serviceProvided) => serviceProvided.providerService,
  )
  serviceProvided: ServiceProvidedEntity;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;

  toModel<T extends Partial<ProviderServiceEntity>>() {
    return Object.assign(this, {
      service: this.service?.toModel(),
      provider: this.provider?.toModel(),
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    });
  }
}
