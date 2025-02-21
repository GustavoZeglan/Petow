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
import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
import { ServiceOrderService } from "@services/services/serviceOrder.service";
import { CreateServiceOrderDTO } from "@services/dtos/CreateServiceOrderDTO";
import { JoiPipe } from "nestjs-joi";
import { ListServiceOrderDTO } from "@services/dtos/ListServiceOrderDTO";
import { UpdateServiceOrderDTO } from "@services/dtos/UpdateServiceOrderDTO";

@Controller("service-order")
export class ServiceOrderController {
  constructor(private readonly serviceOrderService: ServiceOrderService) {}

  @Post()
  async createOrderService(
    @Body(JoiPipe) createServiceOrderDTO: CreateServiceOrderDTO,
  ) {
    Logger.log(
      `User ${createServiceOrderDTO.customerId} is trying to create a Service Order`,
    );
    const serviceOrder = await this.serviceOrderService.createServiceOrder(
      createServiceOrderDTO,
    );

    return new HttpResponseDTO(
      201,
      "Service Order create successfully",
      serviceOrder,
    );
  }

  @Patch(":id")
  async updateServiceOrderFlags(
    @Param("id", ParseIntPipe) id: number,
    @Body(JoiPipe) body: UpdateServiceOrderDTO,
  ) {
    const serviceOrder = await this.serviceOrderService.updateServiceOrderFlags(
      id,
      body,
    );
    return new HttpResponseDTO(
      HttpStatus.OK,
      "Service Order is updated successfully",
      serviceOrder,
    );
  }

  @Get(":id")
  async getServiceOrdersOfUser(
    @Param("id", ParseIntPipe) id: number,
    @Query(JoiPipe) query: ListServiceOrderDTO,
  ) {
    const serviceOrders = await this.serviceOrderService.getServiceOrdersOfUser(
      query,
      id,
    );
    return new HttpResponseDTO(
      HttpStatus.OK,
      "Service orders retrieved successfully",
      serviceOrders,
    );
  }
}
