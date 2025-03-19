import { Module } from "@nestjs/common";
import ServiceEntity from "@architecture/entities/service.entity";
import ServiceOrderEntity from "@architecture/entities/service_order.entity";
import ProviderServiceEntity from "@architecture/entities/provider_service.entity";
import ServiceOrderPetEntity from "@architecture/entities/service_order_pet.entity";
import { ServiceController } from "@services/controllers/service.controller";
import { ServiceOrderController } from "@services/controllers/serviceOrder.controller";
import { ProviderServiceController } from "@services/controllers/providerService.controller";
import { ServiceService } from "@services/services/service.service";
import { ProviderServiceService } from "@services/services/providerService.service";
import { ServiceOrderService } from "@app/domains/services/services/serviceOrder.service";
import ServiceRepository from "@architecture/repositories/service.repository";
import { BaseRepository } from "@architecture/repositories/base.repository";
import ServiceOrderRepository from "@architecture/repositories/service_order.repository";
import ProviderServiceRepository from "@architecture/repositories/provider_service.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "@users/users.module";
import { PetsModule } from "@pets/pets.module";
import { ServiceProvidedService } from "@services/services/serviceProvided.service";
import ServiceProvidedRepository from "@architecture/repositories/service_provided.repository";
import ServiceProvidedEntity from "@architecture/entities/service_provided.entity";
import { ServiceProvidedController } from "@app/domains/services/controllers/serviceProvided.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceEntity,
      ServiceOrderEntity,
      ProviderServiceEntity,
      ServiceOrderPetEntity,
      ServiceProvidedEntity,
    ]),
    UsersModule,
    PetsModule,
  ],
  controllers: [
    ServiceController,
    ServiceOrderController,
    ProviderServiceController,
    ServiceProvidedController,
  ],
  providers: [
    ServiceService,
    ServiceOrderService,
    ProviderServiceService,
    BaseRepository,
    ServiceRepository,
    ServiceOrderRepository,
    ProviderServiceRepository,
    ServiceProvidedService,
    ServiceProvidedRepository,
  ],
  exports: [
    ServiceService,
    ServiceOrderService,
    ProviderServiceService,
    ServiceRepository,
    ServiceOrderRepository,
    ProviderServiceRepository,
    ServiceProvidedRepository,
  ],
})
export class ServicesModule {}
