import { Injectable } from "@nestjs/common";
import ServiceRepository from "@architecture/repositories/service.repository";
import { ListServicesDTO } from "@services/dtos/ListServicesDTO";

@Injectable()
export class ServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async findServices(query: ListServicesDTO) {
    const services = await this.serviceRepository.findMany(query);
    return services.map((service) => service.toModel());
  }
}
