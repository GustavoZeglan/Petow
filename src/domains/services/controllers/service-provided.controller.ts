import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ServiceProvidedService } from "@services/services/serviceProvided.service";
import { CreateServiceProvidedDTO } from "@services/dtos/CreateServiceProvidedDTO";
import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
import { JoiPipe } from "nestjs-joi";
import { ListServiceProvidedDTO } from "@services/dtos/ListServiceProvidedDTO";
import { UpdateServiceProvidedDTO } from "@services/dtos/UpdateServiceProvidedDTO";

@Controller("service-provided")
export class ServiceProvidedController {
  constructor(private serviceProvidedService: ServiceProvidedService) {}

  @Post(":providerId")
  async createServiceProvided(
    @Param("providerId", ParseIntPipe)
    providerId: number,
    @Body(JoiPipe) dto: CreateServiceProvidedDTO,
  ) {
    const serviceProvided =
      await this.serviceProvidedService.createServiceProvided(providerId, dto);

    return new HttpResponseDTO(
      HttpStatus.CREATED,
      "Service Provided created successfully",
      serviceProvided,
    );
  }

  @Patch(":userId/:id")
  async updateServiceProvidedFlags(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("id", ParseIntPipe) id: number,
    @Body(JoiPipe) body: UpdateServiceProvidedDTO,
  ) {
    const serviceProvided =
      await this.serviceProvidedService.updateServiceProvided(userId, id, body);
    return new HttpResponseDTO(
      HttpStatus.OK,
      "Service Order is updated successfully",
      serviceProvided,
    );
  }

  @Get(":userId")
  async getServiceProvided(
    @Param("userId", ParseIntPipe)
    userId: number,
    @Query(JoiPipe) query: ListServiceProvidedDTO,
  ) {
    const serviceProvided =
      await this.serviceProvidedService.getServiceProvided(query, userId);
    return new HttpResponseDTO(
      HttpStatus.OK,
      "Service Provided retrieved successfully",
      serviceProvided,
    );
  }
}
