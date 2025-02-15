import ProviderServiceEntity from "@services/entities/provider_service.entity";
import ServiceDTO from "@services/dtos/ServiceDTO";
import UserDTO from "@users/dtos/UserDTO";

export class ProviderServiceDTO {
  id: number;
  price: number;
  service?: ServiceDTO;
  provider?: UserDTO;

  constructor
    (
      id: number,
      price: number,
      service?: ServiceDTO,
      provider?: UserDTO,
    ) {
    this.id = id;
    this.price = price;
    if (service) this.service = service;
    if (provider) this.provider = provider;
  }

  static fromEntity(entity: ProviderServiceEntity): ProviderServiceDTO {
    return new ProviderServiceDTO(
      entity.id,
      entity.price,
      entity.service ? ServiceDTO.fromEntity(entity.service) : undefined,
      entity.provider ? UserDTO.fromEntity(entity.provider) : undefined,
    )
  }

};