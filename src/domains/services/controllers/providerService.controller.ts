import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { ProviderServiceService } from "@services/services/providerService.service";
import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
import { CreateProviderServiceDTO } from "@services/dtos/CreateProviderServiceDTO";
import { JoiPipe } from "nestjs-joi";
import { UpdateProviderServiceDTO } from "@services/dtos/UpdateProviderServiceDTO";
import { ListProviderServiceDTO } from "@services/dtos/ListProviderServiceDTO";
import { RequestDTO } from "@architecture/dtos/RequestDTO";
import { ServiceEnum } from "@architecture/enums/service.enum";
import { GetProviderServiceDTO } from "../dtos/GetProvidersDTO";

@Controller("provider-service")
export class ProviderServiceController {
  constructor(
    private readonly providerServiceService: ProviderServiceService,
  ) {}

  @Get(":id")
  async getProviderService(
    @Req() request: RequestDTO,
    @Query(JoiPipe) query: ListProviderServiceDTO,
    @Param("id", ParseIntPipe) id: number,
  ) {
    const userId = request.user.id;
    Logger.log(
      `User ${userId} is trying to get provider service with id ${id}`,
    );
    const providerServices =
      await this.providerServiceService.findProviderServicesById(id, query);

    return new HttpResponseDTO(
      HttpStatus.OK,
      "Provider services retrieved successfully",
      providerServices,
    );
  }

  @Get("provider/:service")
  async getProviders(
    @Param("service", new ParseEnumPipe(ServiceEnum)) service: ServiceEnum,
    @Query(JoiPipe) query: GetProviderServiceDTO,
    @Req() req: RequestDTO,
  ) {
    const userId = req.user.id;
    Logger.log(`User ${userId} is trying to see providers of ${service}`);
    const services = await this.providerServiceService.findProviders(
      service,
      userId,
      query,
    );
    return new HttpResponseDTO(
      HttpStatus.OK,
      "Services retrieved successfully",
      services,
    );
  }

  @Patch(":id")
  async updateProviderService(
    @Param("id", ParseIntPipe) id: number,
    @Req() request: RequestDTO,
    @Body(JoiPipe) dto: UpdateProviderServiceDTO,
  ) {
    const userId = request.user.id;
    Logger.log(`User ${userId} is trying to update a provider`);
    const providerService =
      await this.providerServiceService.updateProviderService(userId, id, dto);

    return new HttpResponseDTO(
      HttpStatus.OK,
      "Provider service updated successfully",
      providerService,
    );
  }

  @Post()
  async createProviderService(
    @Req() request: RequestDTO,
    @Body(JoiPipe) dto: CreateProviderServiceDTO,
  ) {
    const userId = request.user.id;
    Logger.log(`User ${userId} is trying to create a provider service`);
    const providerService =
      await this.providerServiceService.createProviderService(
        dto.price,
        dto.serviceId,
        userId,
      );

    return new HttpResponseDTO(
      HttpStatus.CREATED,
      "Provider service created successfully",
      providerService,
    );
  }
}
