import ServiceOrderEntity from "src/core/entities/service_order.entity";
import AddressDTO from "./AddressDTO";
import ServiceDTO from "./ServiceDTO";
import UserDTO from "./UserDTO";
import PetDTO from "./PetDTO";

export default class ServiceOrderDTO {
  id: number;
  service: ServiceDTO;
  customer: UserDTO;
  provider: UserDTO;
  address: AddressDTO;
  durationMinutes: number;
  isAccepted: boolean;
  isDone: boolean;
  pets: PetDTO[] = [];

  constructor(
    id: number,
    service: ServiceDTO,
    customer: UserDTO,
    provider: UserDTO,
    address: AddressDTO,
    durationMinutes: number,
    isAccepted: boolean,
    isDone: boolean,
    pets: PetDTO[],
  ) {
    this.id = id;
    this.service = service;
    this.customer = customer;
    this.provider = provider;
    this.address = address;
    this.durationMinutes = durationMinutes;
    this.isAccepted = isAccepted;
    this.isDone = isDone;
    if (pets) this.pets = pets;
  }

  static fromEntity(entity: ServiceOrderEntity): ServiceOrderDTO {
    return new ServiceOrderDTO(
      entity.id,
      ServiceDTO.fromEntity(entity.service),
      UserDTO.fromEntity(entity.customer),
      UserDTO.fromEntity(entity.provider),
      AddressDTO.fromEntity(entity.address),
      entity.durationMinutes,
      entity.isAccepted,
      entity.isDone,
      entity.serviceOrderPets.flatMap((serviceOrderPet) =>
        PetDTO.fromEntity(serviceOrderPet.pet),
      ),
    );
  }
}
