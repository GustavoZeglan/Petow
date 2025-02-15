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
import ServiceOrderEntity from "@services/entities/service_order.entity"
import ProviderServiceEntity from "@services/entities/provider_service.entity";

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

  @OneToMany(() => ServiceOrderEntity, (serviceOrders) => serviceOrders.service)
  @JoinColumn({ name: "service_id" })
  serviceOrders: ServiceOrderEntity[];

  @OneToMany(() => ProviderServiceEntity, (providerService) => providerService.service)
  @JoinColumn({ name: "service_id" })
  providerServices: ProviderServiceEntity[]; 

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;
}
