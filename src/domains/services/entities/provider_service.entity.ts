import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import ServiceEntity from "@services/entities/service.entity";
import UserEntity from "@users/entities/user.entity";


@Entity("provider_service")
export default class ProviderServiceEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "price", type: "decimal", precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => ServiceEntity, service => service.providerServices)
  @JoinColumn({ name: "service_id" })
  service: ServiceEntity;

  @ManyToOne(() => UserEntity, user => user.providerServices)
  @JoinColumn({ name: "provider_id" })
  provider: UserEntity;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;
}