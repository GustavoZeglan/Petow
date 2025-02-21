// import { ProviderServiceService } from "@app/domains/services/services/providerService.service";
// import UserRepository from "@architecture/repositories/user.repository";
// import { TestingModule, Test } from "@nestjs/testing";
// import ServiceRepository from "@architecture/repositories/service.repository";
// import ProviderServiceRepository from "@architecture/repositories/provider_service.repository";
// import {
//   mockedProvider,
//   mockedProviderServices,
//   mockedService,
// } from "@services/services/tests/serviceMock";

// describe("ProviderServiceService Tests", () => {
//   let providerServiceService: ProviderServiceService;
//   let providerServiceRepository: ProviderServiceRepository;
//   let serviceRepository: ServiceRepository;
//   let userRepository: UserRepository;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       providers: [
//         ProviderServiceService,
//         {
//           provide: ProviderServiceRepository,
//           useFactory: jest.fn,
//         },
//         {
//           provide: UserRepository,
//           useValue: {},
//           useFactory: jest.fn,
//         },
//         {
//           provide: ServiceRepository,
//           useValue: {},
//           useFactory: jest.fn,
//         },
//       ],
//     }).compile();

//     providerServiceService = moduleFixture.get<ProviderServiceService>(
//       ProviderServiceService,
//     );
//     providerServiceRepository = moduleFixture.get<ProviderServiceRepository>(
//       ProviderServiceRepository,
//     );
//     serviceRepository = moduleFixture.get<ServiceRepository>(ServiceRepository);
//     userRepository = moduleFixture.get<UserRepository>(UserRepository);
//   });

//   it("should be defined", () => {
//     expect(providerServiceService).toBeDefined();
//   });

//   it("Should retrieve a provider service by user id", async () => {
//     providerServiceRepository.findByUserId = jest
//       .fn()
//       .mockResolvedValueOnce([mockedProviderServices]);
//     const providerService =
//       await providerServiceService.findProviderServicesByUserId(1);
//     expect(providerService).toBeDefined();
//     providerService.forEach((providerService) => {
//       expect(providerService).toHaveProperty("id");
//       expect(providerService).toHaveProperty("price");
//       expect(providerService).toHaveProperty("service");
//       expect(providerService).toHaveProperty("provider");
//     });
//   });

//   it("Should create a provider service", async () => {
//     serviceRepository.findOneBy = jest
//       .fn()
//       .mockResolvedValueOnce(mockedService);
//     userRepository.findOneBy = jest.fn().mockResolvedValueOnce(mockedProvider);

//     providerServiceRepository.create = jest
//       .fn()
//       .mockResolvedValueOnce(mockedProviderServices);
//     providerServiceRepository.save = jest
//       .fn()
//       .mockResolvedValueOnce(mockedProviderServices);

//     const providerService = await providerServiceService.createProviderService(
//       mockedProviderServices.price,
//       mockedProviderServices.service.id,
//       mockedProviderServices.provider.id,
//     );

//     expect(providerService).toBeDefined();
//     expect(providerService.id).toEqual(mockedProviderServices.id);
//     expect(providerService.price).toEqual(mockedProviderServices.price);
//     expect(providerService.service).toEqual(mockedProviderServices.service);
//     expect(providerService.provider).toEqual(mockedProviderServices.provider);
//   });
// });
