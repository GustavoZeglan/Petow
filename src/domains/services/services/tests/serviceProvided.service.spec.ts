import ProviderServiceRepository from "@architecture/repositories/provider_service.repository";
import ServiceOrderRepository from "@architecture/repositories/service_order.repository";
import ServiceProvidedRepository from "@architecture/repositories/service_provided.repository";
import UserRepository from "@architecture/repositories/user.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { ServiceProvidedService } from "@services/services/serviceProvided.service";
import {
  mockedProvider,
  mockedProviderServices,
  mockedServiceOrder,
  mockedServiceProvided,
} from "@services/services/tests/serviceMock";
import { CreateServiceProvidedDTO } from "@services/dtos/CreateServiceProvidedDTO";

describe("ServiceProvidedService", () => {
  let serviceProvidedService: ServiceProvidedService;
  let serviceProvidedRepository: ServiceProvidedRepository;
  let serviceOrderRepository: ServiceOrderRepository;
  let providerServiceRepository: ProviderServiceRepository;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceProvidedService,
        {
          provide: ServiceProvidedRepository,
          useFactory: jest.fn,
        },
        {
          provide: ServiceOrderRepository,
          useFactory: jest.fn,
        },
        {
          provide: ProviderServiceRepository,
          useFactory: jest.fn,
        },
        {
          provide: UserRepository,
          useFactory: jest.fn,
        },
      ],
    }).compile();

    serviceProvidedService = module.get<ServiceProvidedService>(
      ServiceProvidedService,
    );
    serviceProvidedRepository = module.get<ServiceProvidedRepository>(
      ServiceProvidedRepository,
    );
    serviceOrderRepository = module.get<ServiceOrderRepository>(
      ServiceOrderRepository,
    );
    providerServiceRepository = module.get<ProviderServiceRepository>(
      ProviderServiceRepository,
    );
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it("should be defined", () => {
    expect(serviceProvidedService).toBeDefined();
    expect(serviceProvidedRepository).toBeDefined();
  });

  it("should create a service provided", async () => {
    userRepository.findOneBy = jest.fn().mockResolvedValue(mockedProvider);

    serviceOrderRepository.findOneBy = jest
      .fn()
      .mockResolvedValue(mockedServiceOrder);

    providerServiceRepository.findOneBy = jest
      .fn()
      .mockResolvedValue(mockedProviderServices);

    serviceProvidedRepository.create = jest
      .fn()
      .mockResolvedValue(mockedServiceProvided);

    serviceProvidedRepository.save = jest
      .fn()
      .mockResolvedValue(mockedServiceProvided);

    serviceOrderRepository.findOne = jest
      .fn()
      .mockResolvedValueOnce(mockedServiceOrder);

    providerServiceRepository.findOne = jest
      .fn()
      .mockResolvedValueOnce(mockedProviderServices);

    const serviceProvidedToCreate: CreateServiceProvidedDTO = {
      ...mockedServiceProvided,
    };

    const serviceProvided = await serviceProvidedService.createServiceProvided(
      3,
      serviceProvidedToCreate,
    );
    expect(serviceProvided).toEqual(mockedServiceProvided);
  });
});
