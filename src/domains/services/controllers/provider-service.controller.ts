import { Body, Controller, Get, HttpStatus, Logger, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProviderServiceService } from '@services/services/provider-service.service';
import { HttpResponseDTO } from '@architecture/dtos/HttpResponseDTO';
import { CreateProviderServiceDTO } from '@architecture/dtos/CreateProviderServiceDTO';
import { JoiPipe } from 'nestjs-joi';

@Controller('provider-service')
export class ProviderServiceController {

  constructor(private readonly providerServiceService: ProviderServiceService) { }

  @Get(":id")
  async getProviderProviderServices(
    @Param("id", ParseIntPipe) id: number,
  ) {
    Logger.log(`User ${id} is trying to get provider services`);
    const providerServices = await this.providerServiceService.findProviderServicesByUserId(id);
    return new HttpResponseDTO(HttpStatus.OK, 'Provider services retrieved successfully', providerServices);
  }

  @Post(":id")
  async createProviderService(
    @Param("id", ParseIntPipe) id: number,
    @Body(JoiPipe) dto: CreateProviderServiceDTO,
  ) {
    Logger.log(`User ${id} is trying to create a provider service`);
    const providerService = await this.providerServiceService.createProviderService(dto.price, dto.service_id, id);
    return new HttpResponseDTO(HttpStatus.CREATED, 'Provider service created successfully', providerService);
  }
}
