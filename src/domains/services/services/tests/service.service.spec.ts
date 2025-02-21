import { Test, TestingModule } from "@nestjs/testing";
import { ServiceService } from "@services/services/service.service";
import ServiceRepository from "@architecture/repositories/service.repository";

describe("ServiceService Tests", () => {
  let serviceService: ServiceService;
  let serviceRepository: ServiceRepository;

  const servicesMockRepository = {
    findMany: jest.fn().mockResolvedValue([
      {
        id: 1,
        type: "Ride",
        hasPath: true,
        isUnitary: false,
        toModel: jest.fn().mockReturnValue({
          id: 1,
          type: "Ride",
          hasPath: true,
          isUnitary: false,
        }),
      },
    ]),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceService,
        {
          provide: ServiceRepository,
          useValue: servicesMockRepository,
          useFactory: jest.fn,
        },
      ],
    }).compile();

    serviceService = moduleFixture.get<ServiceService>(ServiceService);
    serviceRepository = moduleFixture.get<ServiceRepository>(ServiceRepository);
  });

  it("Should be defined", async () => {
    expect(serviceService).toBeDefined();
    expect(serviceRepository).toBeDefined();
  });

  it("Should return all services", async () => {
    const result = await serviceService.findServices({});
    expect(result).toBeDefined();
  });
});
