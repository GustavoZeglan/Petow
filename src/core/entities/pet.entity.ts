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
import ServiceOrderPetEntity from "./service_order_pet.entity";
import UserEntity from "./user.entity";
import BreedEntity from "./breed.entity";

@Entity("pets")
export default class PetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", length: "255" })
  name: string;

  @Column({ name: "birthday", type: "date" })
  birthday: Date;

  @Column({ name: "comments", type: "text" })
  comments: string;

  @OneToMany(
    () => ServiceOrderPetEntity,
    (serviceOrderPet) => serviceOrderPet.pet,
  )
  serviceOrders: ServiceOrderPetEntity[];

  @ManyToOne(() => UserEntity, (user) => user.pets)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @ManyToOne(() => BreedEntity, (breed) => breed.pets)
  @JoinColumn({ name: "breed_id" })
  breed: BreedEntity;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;
}
