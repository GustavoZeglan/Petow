import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { ServiceProvidedService } from "@services/services/serviceProvided.service";
import { CreateServiceProvidedDTO } from "@services/dtos/CreateServiceProvidedDTO";
import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
import { JoiPipe } from "nestjs-joi";
import { ListServiceProvidedDTO } from "@services/dtos/ListServiceProvidedDTO";
import { UpdateServiceProvidedDTO } from "@services/dtos/UpdateServiceProvidedDTO";
import { RequestDTO } from "@architecture/dtos/RequestDTO";

@Controller("service-provided")
export class ServiceProvidedController {
  constructor(private serviceProvidedService: ServiceProvidedService) {}

  @Post()
  async createServiceProvided(
    @Req() request: RequestDTO,
    @Body(JoiPipe) dto: CreateServiceProvidedDTO,
  ) {
    const userId = request.user.id;
    const serviceProvided =
      await this.serviceProvidedService.createServiceProvided(userId, dto);

    return new HttpResponseDTO(
      HttpStatus.CREATED,
      "Service Provided created successfully",
      serviceProvided,
    );
  }

  @Patch(":id")
  async updateServiceProvidedFlags(
    @Req() request: RequestDTO,
    @Param("id", ParseIntPipe) id: number,
    @Body(JoiPipe) body: UpdateServiceProvidedDTO,
  ) {
    const userId = request.user.id;
    const serviceProvided =
      await this.serviceProvidedService.updateServiceProvided(userId, id, body);
    return new HttpResponseDTO(
      HttpStatus.OK,
      "Service Order is updated successfully",
      serviceProvided,
    );
  }

  @Get(":id")
  async getServiceProvidedById(
    @Param("id", ParseIntPipe) id: number,
    @Req() request: RequestDTO,
    @Query(JoiPipe) query: ListServiceProvidedDTO,
  ) {
    const userId = request.user.id;
    Logger.log(
      `User ${userId} is trying to get service provided with id ${id}`,
    );
    const serviceProvided =
      await this.serviceProvidedService.getServiceProvidedById(
        query,
        id,
        userId,
      );
    return new HttpResponseDTO(
      HttpStatus.OK,
      "Service Provided retrieved successfully",
      serviceProvided,
    );
  }
}
