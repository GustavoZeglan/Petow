import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import ServiceOrderEntity from "@architecture/entities/service_order.entity";
import PetEntity from "@architecture/entities/pet.entity";

@Entity("service_order_pet")
export default class ServiceOrderPetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ServiceOrderEntity,
    (serviceOrder) => serviceOrder.serviceOrderPets,
  )
  @JoinColumn({ name: "service_order" })
  serviceOrder: ServiceOrderEntity;

  @ManyToOne(() => PetEntity, (pet) => pet.serviceOrders)
  @JoinColumn({ name: "pet_id" })
  pet: PetEntity;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;

  toModel<T extends Partial<ServiceOrderPetEntity>>() {
    return Object.assign(this, {
      pet: this.pet?.toModel(),
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    });
  }
}
