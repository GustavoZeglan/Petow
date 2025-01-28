import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import PetEntity from "./pet.entity";

@Entity("breed")
export default class BreedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "api_id", type: "int4" })
  apiId: number;

  @Column({ name: "name", type: "varchar", length: "255" })
  name: string;

  @Column({ name: "breed_for", type: "varchar", length: "255" })
  breedFor: string;

  @Column({ name: "temperament", type: "text" })
  temperament: string;

  @Column({ name: "life_span", type: "varchar", length: "50" })
  lifeSpan: string;

  @Column({ name: "weight", type: "varchar", length: "50" })
  weight: string;

  @Column({ name: "height", type: "varchar", length: "50" })
  height: string;

  @OneToMany(() => PetEntity, (pets) => pets.breed)
  pets: PetEntity[];

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;
}
