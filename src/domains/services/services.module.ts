import { Module } from '@nestjs/common';
import ServiceEntity from '@services/entities/service.entity';
import ServiceOrderEntity from '@services/entities/service_order.entity';
import ProviderServiceEntity from '@services/entities/provider_service.entity';
import ServiceOrderPetEntity from '@services/entities/service_order_pet.entity';
import { ServiceController } from '@services/controllers/service.controller';
import { ServiceOrderController } from '@services/controllers/service-order.controller';
import { ProviderServiceController } from '@services/controllers/provider-service.controller';
import { ServiceService } from '@services/services/service.service';
import { ProviderServiceService } from '@services/services/provider-service.service';
import { ServiceOrderService } from '@services/services/service-order.service';
import ServiceRepository from '@services/repositories/service.repository';
import { BaseRepository } from '@architecture/repositories/base.repository';
import ServiceOrderRepository from '@services/repositories/service-order.repository';
import ProviderServiceRepository from '@services/repositories/provider-service.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { PetsModule } from '../pets/pets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceEntity,
      ServiceOrderEntity,
      ProviderServiceEntity,
      ServiceOrderPetEntity,
    ]),
    UsersModule,
    PetsModule,
  ],
  controllers: [
    ServiceController,
    ServiceOrderController,
    ProviderServiceController,
  ],
  providers: [
    ServiceService,
    ServiceOrderService,
    ProviderServiceService,
    BaseRepository,
    ServiceRepository,
    ServiceOrderRepository,
    ProviderServiceRepository,
  ],
  exports: [
    ServiceService,
    ServiceOrderService,
    ProviderServiceService,
    ServiceRepository,
    ServiceOrderRepository,
    ProviderServiceRepository
  ]
})
export class ServicesModule { }
