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
import ServiceOrderEntity from "@architecture/entities/service_order.entity";
import UserTypeEntity from "@architecture/entities/user_type.entity";
import ProviderServiceEntity from "@architecture/entities/provider_service.entity";
import AddressEntity from "@architecture/entities/address.entity";
import PetEntity from "@architecture/entities/pet.entity";
import FeedbackEntity from "@architecture/entities/feedback.entity";

@Entity("users")
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", length: "100" })
  name: string;

  @Column({ name: "email", type: "varchar", length: "80", unique: true })
  email: string;

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
  address: AddressEntity[];

  @OneToMany(() => ServiceOrderEntity, (serviceOrder) => serviceOrder.customer)
  serviceOrderCustomer: ServiceOrderEntity[];

  @OneToMany(() => ServiceOrderEntity, (serviceOrder) => serviceOrder.provider)
  serviceOrderProvider: ServiceOrderEntity[];

  @OneToMany(() => PetEntity, (pets) => pets.user)
  @JoinColumn({ name: "user_id" })
  pets: PetEntity[];

  @OneToMany(
    () => ProviderServiceEntity,
    (providerService) => providerService.provider,
  )
  @JoinColumn({ name: "provider_id" })
  providerServices: ProviderServiceEntity[];

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.sender)
  feedbacksSender: FeedbackEntity[];

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.receiver)
  feedbacksReceiver: FeedbackEntity[];

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;

  toModel<T extends Partial<UserEntity>>() {
    return Object.assign(this, {
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
      password: undefined,
      type: undefined,
      phone: undefined,
      cpf: undefined,
    });
  }
}
