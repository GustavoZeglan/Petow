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
import PetEntity from "@architecture/entities/pet.entity";
import SpeciesEntity from "@architecture/entities/species.entity";

@Entity("breed")
export default class BreedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", length: "255" })
  name: string;

  @Column({ name: "temperament", type: "text" })
  temperament: string;

  @Column({ name: "life_span", type: "varchar", length: "50" })
  lifeSpan: string;

  @Column({ name: "weight", type: "varchar", length: "50" })
  weight: string;

  @OneToMany(() => PetEntity, (pets) => pets.breed)
  pets: PetEntity[];

  @ManyToOne(() => SpeciesEntity, (specie) => specie.breeds)
  @JoinColumn({ name: "specie_id" })
  specie: SpeciesEntity;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;

  toModel<T extends Partial<BreedEntity>>() {
    return Object.assign(this, {
      specie: this?.specie?.toModel(),
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    });
  }
}
