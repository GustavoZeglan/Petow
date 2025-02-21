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
} from "@nestjs/common";
import { ProviderServiceService } from "@services/services/providerService.service";
import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
import { CreateProviderServiceDTO } from "@services/dtos/CreateProviderServiceDTO";
import { JoiPipe } from "nestjs-joi";
import { UpdateProviderServiceDTO } from "../dtos/UpdateProviderServiceDTO";
import { ListProviderServiceDTO } from "../dtos/ListProviderServiceDTO";

@Controller("provider-service")
export class ProviderServiceController {
  constructor(
    private readonly providerServiceService: ProviderServiceService,
  ) {}

  @Get(":userId")
  async getProviderProviderServices(
    @Param("userId", ParseIntPipe) userId: number,
    @Query(JoiPipe) query: ListProviderServiceDTO,
  ) {
    Logger.log(`User ${userId} is trying to get provider services`);
    const providerServices =
      await this.providerServiceService.findProviderServicesByUserId(
        userId,
        query,
      );

    return new HttpResponseDTO(
      HttpStatus.OK,
      "Provider services retrieved successfully",
      providerServices,
    );
  }

  @Patch(":userId/:id")
  async updateProviderService(
    @Param("id", ParseIntPipe) id: number,
    @Param("userId", ParseIntPipe) userId: number,
    @Body(JoiPipe) dto: UpdateProviderServiceDTO,
  ) {
    Logger.log(`User ${id} is trying to update a provider`);
    const providerService =
      await this.providerServiceService.updateProviderService(userId, id, dto);

    return new HttpResponseDTO(
      HttpStatus.OK,
      "Provider service updated successfully",
      providerService,
    );
  }

  @Post(":id")
  async createProviderService(
    @Param("id", ParseIntPipe) id: number,
    @Body(JoiPipe) dto: CreateProviderServiceDTO,
  ) {
    Logger.log(`User ${id} is trying to create a provider service`);
    const providerService =
      await this.providerServiceService.createProviderService(
        dto.price,
        dto.serviceId,
        id,
      );

    return new HttpResponseDTO(
      HttpStatus.CREATED,
      "Provider service created successfully",
      providerService,
    );
  }
}
