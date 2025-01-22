import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("services")
export default class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "type", type: "varchar" })
  type: string;

  @Column({ name: "has_path", type: "boolean" })
  hasPath: boolean;

  @Column({ name: "is_unitary", type: "boolean" })
  isUnitary: boolean;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;
}
