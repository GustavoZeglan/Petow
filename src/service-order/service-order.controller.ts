import { Body, Controller, Logger, Post, UsePipes } from "@nestjs/common";
import { HttpResponseDTO } from "src/common/classes/HttpResponseDTO";
import { ServiceOrderService } from "./service-order.service";
import { ZodValidationPipe } from "src/common/pipes/ZodValidationPipe.pipe";
import {
  CreateServiceOrderDTO,
  CreateServiceOrderSchema,
} from "src/common/schemas/service-order/createServiceOrder.schema";

@Controller("service-order")
export class ServiceOrderController {
  constructor(private readonly serviceOrderService: ServiceOrderService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateServiceOrderSchema))
  async createOrderService(
    @Body() createServiceOrderDTO: CreateServiceOrderDTO,
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
}
