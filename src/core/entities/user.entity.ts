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
import AddressEntity from "./address.entity";
import ServiceOrderEntity from "./service_order.entity";
import UserTypeEntity from "./user_type.entity";
import { genderEnum } from "../../common/enums/gender.enum";
import PetEntity from "./pet.entity";

@Entity("users")
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", length: "100" })
  name: string;

  @Column({ name: "email", type: "varchar", length: "80", unique: true })
  email: string;

  @Column({ name: "gender", type: "enum", enum: genderEnum })
  gender: genderEnum;

  @Column({ name: "cpf", type: "varchar", length: "11", unique: true })
  cpf: string;

  @Column({ name: "phone", type: "varchar", length: "50" })
  phone: string;

  @Column({ name: "password", type: "text" })
  password: string;

  @ManyToOne(() => UserTypeEntity, (userType) => userType.users)
  @JoinColumn({ name: "user_type_id" })
  type: UserTypeEntity;

  @OneToMany(() => AddressEntity, (address) => address.user)
  @JoinColumn({ name: "user_id" })
  address: AddressEntity[];

  @OneToMany(() => ServiceOrderEntity, (serviceOrder) => serviceOrder.customer)
  @JoinColumn({ name: "user_id" })
  serviceOrderCustomer: ServiceOrderEntity[];

  @OneToMany(() => ServiceOrderEntity, (serviceOrder) => serviceOrder.provider)
  @JoinColumn({ name: "user_id" })
  serviceOrderProvider: ServiceOrderEntity[];

  @OneToMany(() => PetEntity, (pets) => pets.user)
  @JoinColumn({ name: "user_id" })
  pets: PetEntity[];

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;
}
