import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import BreedEntity from "@architecture/entities/breed.entity";
import PetEntity from "@architecture/entities/pet.entity";

@Entity({ name: "species" })
export default class SpeciesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name" })
  name: string;

  @OneToMany(() => BreedEntity, (breed) => breed.specie)
  breeds: BreedEntity[];

  @OneToMany(() => PetEntity, (pet) => pet.specie)
  pets: PetEntity[];

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;

  toModel<T extends Partial<SpeciesEntity>>() {
    return Object.assign(this, {
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    });
  }
}
