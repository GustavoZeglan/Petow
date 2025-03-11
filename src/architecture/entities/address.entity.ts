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
import UserEntity from "@architecture/entities/user.entity";
import ServiceOrderEntity from "@architecture/entities/service_order.entity";

@Entity("address")
export default class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "street", type: "varchar", length: "255" })
  street: string;

  @Column({ name: "number", type: "varchar", length: "10" })
  number: string;

  @Column({ name: "city", type: "varchar", length: "100" })
  city: string;

  @Column({ name: "state", type: "varchar", length: "20" })
  state: string;

  @Column({ name: "zip_code", type: "varchar", length: "10" })
  zipcode: string;

  @Column({ name: "latitude", type: "decimal", precision: 10, scale: 7 })
  latitude: number;

  @Column({ name: "longitude", type: "decimal", precision: 10, scale: 7 })
  longitude: number;

  @Column({ name: "place_id", type: "varchar", length: "255" })
  placeId: string;

  @ManyToOne(() => UserEntity, (user) => user.address)
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

  toModel<T extends Partial<AddressEntity>>() {
    return Object.assign(this, {
      user: this.user?.toModel(),
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    });
  }
}
