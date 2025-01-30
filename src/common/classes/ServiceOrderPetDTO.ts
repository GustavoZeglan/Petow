import ServiceOrderPetEntity from "@core/entities/service_order_pet.entity";
import PetDTO from "./PetDTO";
import ServiceOrderDTO from "./ServiceOrderDTO";

export default class ServiceOrderPetDTO {
  id: number;
  serviceOrder: ServiceOrderDTO;
  pet: PetDTO;

  constructor(id: number, serviceOrder: ServiceOrderDTO, pet: PetDTO) {
    this.id = id;
    this.serviceOrder = serviceOrder;
    this.pet = pet;
  }

  static fromEntity(entity: ServiceOrderPetEntity) {
    return new ServiceOrderPetDTO(
      entity.id,
      ServiceOrderDTO.fromEntity(entity.serviceOrder),
      PetDTO.fromEntity(entity.pet),
    );
  }
}
