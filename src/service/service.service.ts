import { Injectable } from "@nestjs/common";
import { ServiceRepository } from "./service.repository";
import { DataSource } from "typeorm";
import ServiceDTO from "src/common/classes/ServiceDTO";

@Injectable()
export class ServiceService {
  private readonly serviceRepository = ServiceRepository(this.dataSource);

  constructor(private readonly dataSource: DataSource) { }

  async findServices() {
    const services = await this.serviceRepository.findAll();

    const servicesDtos: ServiceDTO[] = [];

    for (const service of services) {
      const dto = ServiceDTO.fromEntity(service);
      servicesDtos.push(dto);
    }

    return servicesDtos;
  }
}
