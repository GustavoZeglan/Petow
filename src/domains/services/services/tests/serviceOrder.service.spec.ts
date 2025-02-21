import UserRepository from "@architecture/repositories/user.repository";
import { TestingModule, Test } from "@nestjs/testing";
import ServiceOrderRepository from "@architecture/repositories/service_order.repository";
import { ServiceOrderService } from "@app/domains/services/services/serviceOrder.service";
import AddressRepository from "@architecture/repositories/address.repository";
import ServiceRepository from "@architecture/repositories/service.repository";
import PetRepository from "@architecture/repositories/pet.repository";
import { CreateServiceOrderDTO } from "@services/dtos/CreateServiceOrderDTO";
import { DataSource } from "typeorm";
import {
  mockedAddress,
  mockedCustomer,
  mockedPetOne,
  mockedPetTwo,
  mockedProvider,
  mockedService,
  mockedServiceOrder,
  queryRunnerMock,
} from "@services/services/tests/serviceMock";
import ServiceOrderEntity from "@architecture/entities/service_order.entity";

jest.mock("@architecture/entities/service_order.entity", () => {
  return {
    default: jest.fn().mockImplementation(() => ({
      toModel: jest.fn().mockReturnValueOnce(mockedServiceOrder),
    })),
  };
});

describe("ServiceOrderService Tests", () => {
  let serviceOrderService: ServiceOrderService;
  let serviceOrderRepository: ServiceOrderRepository;
  let serviceRepository: ServiceRepository;
  let userRepository: UserRepository;
  let addressRepository: AddressRepository;
  let petRepository: PetRepository;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceOrderService,
        {
          provide: ServiceOrderRepository,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            markServiceOrderAsAccepted: jest.fn(),
            findServiceOrdersByUserId: jest.fn(),
            findServiceOrderInfo: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findOneBy: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: AddressRepository,
          useValue: {
            findOneBy: jest.fn(),
          },
        },
        {
          provide: ServiceRepository,
          useValue: {
            findOneBy: jest.fn(),
          },
        },
        {
          provide: PetRepository,
          useValue: {
            findByIdsWithUserValidation: jest.fn(),
          },
        },
        {
          provide: DataSource,
          useValue: {
            createQueryRunner: jest.fn().mockReturnValue(queryRunnerMock),
          },
        },
      ],
    }).compile();

    serviceOrderService =
      moduleFixture.get<ServiceOrderService>(ServiceOrderService);
    serviceOrderRepository = moduleFixture.get<ServiceOrderRepository>(
      ServiceOrderRepository,
    );
    serviceRepository = moduleFixture.get<ServiceRepository>(ServiceRepository);
    userRepository = moduleFixture.get<UserRepository>(UserRepository);
    addressRepository = moduleFixture.get<AddressRepository>(AddressRepository);
    petRepository = moduleFixture.get<PetRepository>(PetRepository);
    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  it("Should be defined", async () => {
    expect(serviceOrderService).toBeDefined();
    expect(serviceOrderRepository).toBeDefined();
  });

  it("Should create a service order", async () => {
    const createServiceOrderDTO: CreateServiceOrderDTO = {
      serviceId: 1,
      customerId: 1,
      providerId: 2,
      addressId: 1,
      pets: [1, 2],
      durationMinutes: 60,
    };

    serviceRepository.findOneBy = jest
      .fn()
      .mockResolvedValueOnce(mockedService);
    userRepository.findOneBy = jest
      .fn()
      .mockResolvedValueOnce(mockedCustomer)
      .mockResolvedValueOnce(mockedProvider);
    addressRepository.findOneBy = jest
      .fn()
      .mockResolvedValueOnce(mockedAddress);
    petRepository.findByIdsWithUserValidation = jest
      .fn()
      .mockResolvedValueOnce([mockedPetOne, mockedPetTwo]);

    serviceOrderRepository.create = jest
      .fn()
      .mockReturnValue(mockedServiceOrder);

    serviceOrderRepository.save = jest
      .fn()
      .mockResolvedValue(mockedServiceOrder);

    dataSource.createQueryRunner = jest.fn().mockReturnValue(queryRunnerMock);

    serviceOrderRepository.findServiceOrderInfo = jest
      .fn()
      .mockResolvedValue(mockedServiceOrder);

    const result = await serviceOrderService.createServiceOrder(
      createServiceOrderDTO,
    );
    expect(result).toBeDefined();
    expect(result).toEqual(mockedServiceOrder);

    expect(queryRunnerMock.manager.create).toHaveBeenCalledTimes(2);
    expect(queryRunnerMock.manager.create).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ pet: mockedPetOne }),
    );
    expect(queryRunnerMock.manager.create).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ pet: mockedPetTwo }),
    );
  });

  // it("Should mark service order as accepted", async () => {
  //   const mockServiceOrderInstance = new ServiceOrderEntity();
  //   mockServiceOrderInstance.toModel = jest
  //     .fn()
  //     .mockReturnValue(mockedServiceOrder);

  //   serviceOrderRepository.findOneBy = jest
  //     .fn()
  //     .mockResolvedValueOnce(mockServiceOrderInstance);

  //   serviceOrderRepository.markServiceOrderAsAccepted = jest
  //     .fn()
  //     .mockResolvedValueOnce({
  //       ...mockedServiceOrder,
  //       isAccepted: true,
  //     });

  //   await serviceOrderService.markServiceOrderAsAccepted(mockedServiceOrder.id);

  //   expect(
  //     serviceOrderRepository.markServiceOrderAsAccepted,
  //   ).toHaveBeenCalledWith(mockedServiceOrder.id);
  // });

  it("Should return service orders of an user", async () => {
    userRepository.findOne = jest.fn().mockResolvedValueOnce(mockedCustomer);
    serviceOrderRepository.findMany = jest
      .fn()
      .mockResolvedValueOnce([mockedServiceOrder]);

    const result = await serviceOrderRepository.findMany({}, 1);

    expect(result).toBeDefined();
    expect(result).toEqual([mockedServiceOrder]);
  });
});
