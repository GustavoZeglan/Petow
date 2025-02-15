import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import ServiceOrderEntity from "@services/entities/service_order.entity";
import PetEntity from "@pets/entities/pet.entity";

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
}
