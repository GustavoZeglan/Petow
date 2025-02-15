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
import UserEntity from "@users/entities/user.entity";
import ServiceEntity from "@services/entities/service.entity";
import AddressEntity from "@users/entities/address.entity";
import ServiceOrderPetEntity from "@services/entities/service_order_pet.entity";

@Entity("service_order")
export default class ServiceOrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "duration_minutes", type: "int" })
  durationMinutes: number;

  @Column({ name: "is_accepted", type: "boolean", nullable: true })
  isAccepted: boolean;

  @Column({ name: "is_done", type: "boolean", nullable: true })
  isDone: boolean;

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

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;
}
