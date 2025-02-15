import ServiceOrderEntity from "@services/entities/service_order.entity";
import AddressDTO from "@users/dtos/AddressDTO";
import ServiceDTO from "@services/dtos/ServiceDTO";
import UserDTO from "@users/dtos/UserDTO";
import PetDTO from "@pets/dtos/PetDTO";

export default class ServiceOrderDTO {
  id: number;
  service: ServiceDTO;
  customer: UserDTO;
  provider: UserDTO;
  durationMinutes: number;
  isAccepted: boolean;
  isDone: boolean;
  address?: AddressDTO;
  pets?: PetDTO[] = [];

  constructor(
    id: number,
    service: ServiceDTO,
    customer: UserDTO,
    provider: UserDTO,
    durationMinutes: number,
    isAccepted: boolean,
    isDone: boolean,
    address?: AddressDTO,
    pets?: PetDTO[],
  ) {
    this.id = id;
    this.service = service;
    this.customer = customer;
    this.provider = provider;
    this.durationMinutes = durationMinutes;
    this.isAccepted = isAccepted;
    this.isDone = isDone;
    if (address) this.address = address;
    if (pets) this.pets = pets;
  }

  static fromEntity(entity: ServiceOrderEntity): ServiceOrderDTO {
    return new ServiceOrderDTO(
      entity.id,
      ServiceDTO.fromEntity(entity.service),
      UserDTO.fromEntity(entity.customer),
      UserDTO.fromEntity(entity.provider),
      entity.durationMinutes,
      entity.isAccepted,
      entity.isDone,
      entity.address ? AddressDTO.fromEntity(entity.address) : undefined,
      entity.serviceOrderPets
        ? entity.serviceOrderPets?.flatMap((serviceOrderPet) =>
            PetDTO.fromEntity(serviceOrderPet.pet),
          )
        : undefined,
    );
  }
}
