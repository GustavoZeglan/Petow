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
} from "@nestjs/common";
import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
import { ServiceOrderService } from "@services/services/service-order.service";
import {
  CreateServiceOrderDTO
} from "@architecture/dtos/CreateServiceOrderDTO";
import { JoiPipe } from "nestjs-joi";

@Controller("service-order")
export class ServiceOrderController {
  constructor(private readonly serviceOrderService: ServiceOrderService) { }

  @Post()
  async createOrderService(
    @Body(JoiPipe) createServiceOrderDTO: CreateServiceOrderDTO,
  ) {
    Logger.log(
      `User ${createServiceOrderDTO.customer_id} is trying to create a Service Order`,
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
  async markServiceOrderAsAccepted(@Param("id", ParseIntPipe) id: number) {
    await this.serviceOrderService.markServiceOrderAsAccepted(id);
    return new HttpResponseDTO(
      HttpStatus.OK,
      "Service Order is accepted successfully",
    );
  }

  @Get("user/:id")
  async getServiceOrdersOfUser(@Param("id", ParseIntPipe) id: number) {
    const serviceOrders =
      await this.serviceOrderService.getServiceOrdersOfUser(id);
    return new HttpResponseDTO(
      HttpStatus.OK,
      "Service orders retrieved successfully",
      serviceOrders,
    );
  }
}
