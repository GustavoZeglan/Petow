import { Injectable } from "@nestjs/common";
import ServiceRepository from "@services/repositories/service.repository";
import ServiceDTO from "@app/domains/services/dtos/ServiceDTO";

@Injectable()
export class ServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async findServices() {
    const services = await this.serviceRepository.find();

    const servicesDtos: ServiceDTO[] = [];

    for (const service of services) {
      const dto = ServiceDTO.fromEntity(service);
      servicesDtos.push(dto);
    }

    return servicesDtos;
  }
}
