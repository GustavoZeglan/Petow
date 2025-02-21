export const mockedService = {
  id: 1,
  type: "Ride",
  hasPath: true,
  isUnitary: false,
};

export const mockedCustomer = {
  id: 1,
  name: "João Salvi",
  email: "joao.salvi@email.com",
  gender: "M",
  type: {
    id: 1,
    type: "Customer",
  },
};

export const mockedProvider = {
  id: 2,
  name: "Henrique Laureano",
  email: "lal@email.com",
  gender: "M",
  type: {
    id: 1,
    type: "Provider",
  },
};

export const mockedAddress = {
  id: 1,
  street: "Rua das Flores",
  number: "123",
  complement: "Apto 101",
  neighborhood: "Centro",
  city: "São Paulo",
  state: "SP",
  zip_code: "12345-678",
  zipCode: "01010-010",
  country: "Brasil",
  latitude: "-23.5505200",
  longitude: "-46.6333080",
  placeId: "place_id_1",
};

export const mockedPetOne = {
  id: 1,
  name: "Rex",
  birthday: "2019-08-20",
  comments: "Very protective of the family",
};

export const mockedPetTwo = {
  id: 2,
  name: "Luna",
  birthday: "2020-01-15",
  comments: "Loves to play fetch",
};

export const mockedServiceOrder = {
  id: 1,
  service: mockedService,
  customer: mockedCustomer,
  provider: mockedProvider,
  address: mockedAddress,
  pets: [mockedPetOne, mockedPetTwo],
  durationMinutes: 60,
  isAccepted: true,
};

export const mockedProviderServices = {
  id: 1,
  price: 64,
  service: mockedService,
  provider: mockedProvider,
};

export const mockedServiceProvided = {
  providerServiceId: 1,
  serviceOrderId: 1,
  isDone: false,
  id: 1,
  price: 64,
  startDate: new Date(),
};

export const queryRunnerMock = {
  connect: jest.fn().mockResolvedValue(undefined),
  startTransaction: jest.fn().mockResolvedValue(undefined),
  commitTransaction: jest.fn().mockResolvedValue(undefined),
  rollbackTransaction: jest.fn().mockResolvedValue(undefined),
  release: jest.fn().mockResolvedValue(undefined),
  manager: {
    create: jest.fn().mockReturnValue({
      service: mockedService,
      customer: mockedCustomer,
      provider: mockedProvider,
      address: mockedAddress,
      pets: [mockedPetOne, mockedPetTwo],
    }),
    save: jest.fn().mockResolvedValue({
      id: 1,
      service: mockedService,
      customer: mockedCustomer,
      provider: mockedProvider,
      address: mockedAddress,
      pets: [mockedPetOne, mockedPetTwo],
    }),
  },
};
