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
import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
import { ServiceOrderService } from "@services/services/serviceOrder.service";
import { CreateServiceOrderDTO } from "@services/dtos/CreateServiceOrderDTO";
import { JoiPipe } from "nestjs-joi";
import { ListServiceOrderDTO } from "@services/dtos/ListServiceOrderDTO";
import { UpdateServiceOrderDTO } from "@services/dtos/UpdateServiceOrderDTO";
import { RequestDTO } from "@architecture/dtos/RequestDTO";

@Controller("service-order")
export class ServiceOrderController {
  constructor(private readonly serviceOrderService: ServiceOrderService) {}

  @Post()
  async createOrderService(
    @Body(JoiPipe) createServiceOrderDTO: CreateServiceOrderDTO,
    @Req() request: RequestDTO
  ) {
    const userId = request.user.id;
    Logger.log(
      `User ${userId} is trying to create a Service Order`,
    );
    const serviceOrder = await this.serviceOrderService.createServiceOrder(
      userId,
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
    @Req() request: RequestDTO,
    @Body(JoiPipe) body: UpdateServiceOrderDTO,
  ) {
    const userId = request.user.id;
    const serviceOrder = await this.serviceOrderService.updateServiceOrderFlags(
      id,
      userId,
      body,
    );
    return new HttpResponseDTO(
      HttpStatus.OK,
      "Service Order is updated successfully",
      serviceOrder,
    );
  }

  @Get()
  async getServiceOrdersOfUser(
    @Query(JoiPipe) query: ListServiceOrderDTO,
    @Req() request: RequestDTO,
  ) {
    const userId = request.user.id;
    const serviceOrders = await this.serviceOrderService.getServiceOrdersOfUser(
      query,
      userId,
    );
    return new HttpResponseDTO(
      HttpStatus.OK,
      "Service orders retrieved successfully",
      serviceOrders,
    );
  }
}
