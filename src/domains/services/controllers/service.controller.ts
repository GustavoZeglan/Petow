import { Controller, Get } from "@nestjs/common";
import { ServiceService } from "@services/services/service.service";
import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";

@Controller("service")
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  async getServices() {
    const services = await this.serviceService.findServices();

    return new HttpResponseDTO(
      200,
      "Services retrieved successfully",
      services,
    );
  }
}
