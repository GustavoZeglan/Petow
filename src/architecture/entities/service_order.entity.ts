import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import UserEntity from "@architecture/entities/user.entity";
import ServiceEntity from "@architecture/entities/service.entity";
import AddressEntity from "@architecture/entities/address.entity";
import ServiceOrderPetEntity from "@architecture/entities/service_order_pet.entity";
import { ServiceProvidedEntity } from "@architecture/entities/service_provided.entity";

@Entity("service_order")
export default class ServiceOrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "duration_minutes", type: "int" })
  durationMinutes: number;

  @Column({ name: "is_accepted", type: "boolean", nullable: true })
  isAccepted: boolean;

  @Column({ name: "is_done", type: "boolean", default: false })
  isDone: boolean;

  @Column({ name: "is_started", type: "boolean", default: false })
  isStarted: boolean;

  @Column({ name: "is_canceled", type: "boolean", default: false })
  isCanceled: boolean;

  @ManyToOne(() => ServiceEntity, (service) => service)
  @JoinColumn({ name: "service_id" })
  service: ServiceEntity;

  @ManyToOne(() => UserEntity, (customer) => customer.serviceOrderCustomer)
  @JoinColumn({ name: "customer_id" })
  customer: UserEntity;

  @ManyToOne(() => UserEntity, (provider) => provider.serviceOrderProvider)
  @JoinColumn({ name: "provider_id" })
  provider: UserEntity;

  @ManyToOne(() => AddressEntity, (address) => address.serviceOrders)
  @JoinColumn({ name: "address_id" })
  address: AddressEntity;

  @OneToMany(
    () => ServiceOrderPetEntity,
    (serviceOrderPet) => serviceOrderPet.serviceOrder,
  )
  serviceOrderPets: ServiceOrderPetEntity[];

  @OneToMany(
    () => ServiceProvidedEntity,
    (serviceProvided) => serviceProvided.serviceOrder,
  )
  serviceProvided: ServiceProvidedEntity;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;

  toModel<T extends Partial<ServiceOrderEntity>>() {
    return Object.assign(this, {
      service: this.service?.toModel(),
      address: this.address?.toModel(),
      customer: this.customer?.toModel(),
      provider: this.provider?.toModel(),
      serviceOrderPets: this.serviceOrderPets?.map((serviceOrderPet) => {
        return serviceOrderPet?.toModel();
      }),
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    });
  }
}
