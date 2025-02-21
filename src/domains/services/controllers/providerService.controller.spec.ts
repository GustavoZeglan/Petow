// import { Test, TestingModule } from "@nestjs/testing";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import ServiceEntity from "@services/entities/service.entity";
// import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
// import { DatabaseModule } from "@infra/database/database.module";
// import ServiceOrderEntity from "@services/entities/service_order.entity";
// import ServiceOrderPetEntity from "@services/entities/service_order_pet.entity";
// import ProviderServiceEntity from "@services/entities/provider_service.entity";
// import { ProviderServiceController } from "./provider-service.controller";
// import { ProviderServiceService } from "../services/provider-service.service";
// import ProviderServiceRepository from "../repositories/provider-service.repository";
// import ServiceRepository from "../repositories/service.repository";

// describe('ProviderServiceController', () => {
//   let providerServiceController: ProviderServiceController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         TypeOrmModule.forFeature([
//           ServiceEntity,
//           ServiceOrderEntity,
//           ProviderServiceEntity,
//           ServiceOrderPetEntity,
//         ]),
//         DatabaseModule,
//       ],
//       controllers: [ProviderServiceController],
//       providers: [ProviderServiceService, ProviderServiceRepository, ServiceRepository],
//     }).compile();

//     providerServiceController = module.get<ProviderServiceController>(ProviderServiceController);
//   });

//   it('should retrieve all services', async () => {
//     const providerId = 1;
//     const result: HttpResponseDTO = await providerServiceController.getProviderProviderServices(providerId);

//     expect(result.status).toBe(200);
//     for (const service of result.data) {
//       expect(service.id).toBeDefined();
//       expect(service.type).toBeDefined();
//       expect(service.hasPath).toBeDefined();
//       expect(service.isUnitary).toBeDefined();
//     }
//   });
// });
