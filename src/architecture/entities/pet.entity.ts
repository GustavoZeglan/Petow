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
import ServiceOrderPetEntity from "@architecture/entities/service_order_pet.entity";
import UserEntity from "@architecture/entities/user.entity";
import BreedEntity from "@architecture/entities/breed.entity";
import SpeciesEntity from "./species.entity";
import { PetSize } from "@architecture/enums/pet-size.enum";

@Entity("pets")
export default class PetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", length: "255" })
  petName: string;

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

  @ManyToOne(() => SpeciesEntity, (specie) => specie.pets)
  @JoinColumn({ name: "specie_id" })
  specie: SpeciesEntity;

  @Column({ name: "size", type: "enum", enum: PetSize })
  size: PetSize;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;

  toModel<T extends Partial<PetEntity>>() {
    return Object.assign(this, {
      user: this?.user?.toModel(),
      breed: this?.breed?.toModel(),
      specie: this?.specie?.toModel(),
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    });
  }
}
