import { Controller, Get, Query } from "@nestjs/common";
import { ServiceService } from "@services/services/service.service";
import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
import { JoiPipe } from "nestjs-joi";
import { ListServicesDTO } from "@services/dtos/ListServicesDTO";

@Controller("services")
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  async getServices(@Query(JoiPipe) query: ListServicesDTO) {
    const services = await this.serviceService.findServices(query);

    return new HttpResponseDTO(
      200,
      "Services retrieved successfully",
      services,
    );
  }
}
