// import { Test, TestingModule } from "@nestjs/testing";
// import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
// import { ServiceController } from "@services/controllers/service.controller";
// import { ServiceService } from "@services/services/service.service";
// import ServiceEntity from "@services/entities/service.entity";
// import ServiceRepository from "@services/repositories/service.repository";
// import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
// import { DatabaseModule } from "@infra/database/database.module";
// import ServiceOrderEntity from "@services/entities/service_order.entity";
// import ServiceOrderPetEntity from "@services/entities/service_order_pet.entity";
// import ProviderServiceEntity from "@services/entities/provider_service.entity";
// import { DataSource } from "typeorm";

// describe('ServiceController', () => {
//   let serviceController: ServiceController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ServiceController],
//       providers: [ServiceService, ServiceRepository, { provide: getRepositoryToken(ServiceEntity), useFactory: jest.fn }],
//     }).compile();

//     serviceController = module.get<ServiceController>(ServiceController);
//   });

//   it('should retrieve all services', async () => {
//     const result: HttpResponseDTO = await serviceController.getServices();

//     expect(result.status).toBe(200);
//     for (const service of result.data) {
//       expect(service.id).toBeDefined();
//       expect(service.type).toBeDefined();
//       expect(service.hasPath).toBeDefined();
//       expect(service.isUnitary).toBeDefined();
//     }
//   });

// });
