import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import UserEntity from "./user.entity";
import ServiceOrderEntity from "./service_order.entity";

@Entity("address")
export default class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "address_type", type: "varchar", length: "100" })
  addressType: string;

  @Column({ name: "street", type: "varchar", length: "255" })
  street: string;

  @Column({ name: "number", type: "varchar", length: "10" })
  number: string;

  @Column({ name: "complement", type: "varchar", length: "255" })
  complement: string;

  @Column({ name: "neighborhood", type: "varchar", length: "100" })
  neighborhood: string;

  @Column({ name: "city", type: "varchar", length: "100" })
  city: string;

  @Column({ name: "state", type: "varchar", length: "10" })
  state: string;

  @Column({ name: "zip_code", type: "varchar", length: "10" })
  zipCode: string;

  @Column({ name: "country", type: "varchar", length: "100" })
  country: string;

  @Column({ name: "latitude", type: "decimal", precision: 10, scale: 7 })
  latitude: number;

  @Column({ name: "longitude", type: "decimal", precision: 10, scale: 7 })
  longitude: number;

  @Column({ name: "place_id", type: "varchar", length: "255" })
  placeId: string;

  @OneToMany(() => UserEntity, (user) => user.address)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @OneToMany(() => ServiceOrderEntity, (serviceOrders) => serviceOrders.address)
  serviceOrders: ServiceOrderEntity[];

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;
}
