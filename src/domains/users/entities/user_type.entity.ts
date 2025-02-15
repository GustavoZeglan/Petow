import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import UserEntity from "@users/entities/user.entity";

@Entity("user_type")
export default class UserTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "type", type: "varchar", length: "50" })
  type: string;

  @OneToMany(() => UserEntity, (user) => user.type)
  users: UserEntity[];

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;
}
