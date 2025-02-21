import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { CreateServiceProvidedDTO } from "@services/dtos/CreateServiceProvidedDTO";
import ServiceOrderRepository from "@architecture/repositories/service_order.repository";
import ProviderServiceRepository from "@architecture/repositories/provider_service.repository";
import UserRepository from "@architecture/repositories/user.repository";
import ServiceProvidedRepository from "@architecture/repositories/service_provided.repository";
import { ListServiceProvidedDTO } from "@services/dtos/ListServiceProvidedDTO";
import { UpdateServiceProvidedDTO } from "@services/dtos/UpdateServiceProvidedDTO";

@Injectable()
export class ServiceProvidedService {
  constructor(
    private serviceProvidedRepository: ServiceProvidedRepository,
    private serviceOrderRepository: ServiceOrderRepository,
    private providerServiceRepository: ProviderServiceRepository,
    private userRepository: UserRepository,
  ) {}

  async createServiceProvided(
    providerId: number,
    createServiceProvidedDTO: CreateServiceProvidedDTO,
  ) {
    const provider = await this.userRepository.findOneBy({ id: providerId });
    if (!provider) {
      Logger.error("Provider not found");
      throw new BadRequestException("Provider not found");
    }

    const serviceOrder = await this.serviceOrderRepository.findOne({
      where: { id: createServiceProvidedDTO.serviceOrderId },
      relations: ["customer", "provider"],
    });
    if (!serviceOrder) {
      Logger.error("Service Order not found");
      throw new BadRequestException("Service Order not found");
    }

    const providerService = await this.providerServiceRepository.findOne({
      where: { id: createServiceProvidedDTO.providerServiceId },
      relations: ["provider"],
    });
    if (!providerService) {
      Logger.error("Provider Service not found");
      throw new BadRequestException("Provider Service not found");
    }

    if (
      provider.id !== serviceOrder.provider.id ||
      provider.id !== providerService.provider.id
    ) {
      Logger.error("Provider doesn't match");
      throw new BadRequestException("Provider doesn't match");
    }

    if (!serviceOrder.isAccepted || serviceOrder.isDone) {
      Logger.error("Service Order is not accepted or done");
      throw new BadRequestException("Service Order is not accepted or done");
    }

    const serviceProvidedForCreate = this.serviceProvidedRepository.create({
      price: createServiceProvidedDTO.price,
      startDate: createServiceProvidedDTO.startDate,
      serviceOrder: serviceOrder,
      providerService: providerService,
    });

    const createdServiceProvided = await this.serviceProvidedRepository.save(
      serviceProvidedForCreate,
    );
    return createdServiceProvided.toModel();
  }

  async updateServiceProvided(
    userId: number,
    id: number,
    updateServiceProvidedDTO: UpdateServiceProvidedDTO,
  ) {
    const serviceProvided = await this.serviceProvidedRepository.findOne({
      where: { id },
      relations: ["serviceOrder", "serviceOrder.provider"],
    });

    if (!serviceProvided) {
      Logger.error("Service Provided not found");
      throw new BadRequestException("Service Provided not found");
    }

    if (serviceProvided.serviceOrder.provider.id !== userId) {
      Logger.error("User is not the provider");
      throw new BadRequestException("User is not the provider");
    }

    const serviceProvidedToUpdate = this.serviceProvidedRepository.create({
      ...serviceProvided,
      ...updateServiceProvidedDTO,
    });

    const updatedServiceProvided = await this.serviceProvidedRepository.save(
      serviceProvidedToUpdate,
    );

    return updatedServiceProvided.toModel();
  }

  async getServiceProvided(query: ListServiceProvidedDTO, userId: number) {
    const servicesProvided = await this.serviceProvidedRepository.findMany(
      query,
      userId,
    );

    if (!servicesProvided) {
      Logger.error("Services Provided not found");
      throw new BadRequestException("Services Provided not found");
    }

    servicesProvided.map((servicesProvided) => servicesProvided.toModel());

    return servicesProvided;
  }

  // async getServiceProvided(userId: number, id: number) {
  //   const serviceProvided = await this.serviceProvidedRepository.findOne({
  //     where: { id },
  //     relations: ["serviceOrder", "serviceOrder.customer", "serviceOrder.provider"],
  //   });

  //   if (!serviceProvided) {
  //     Logger.error("Service Provided not found");
  //     throw new BadRequestException("Service Provided not found");
  //   }

  //   const isAuthorized = [
  //     serviceProvided.serviceOrder?.customer?.id,
  //     serviceProvided.serviceOrder?.provider?.id
  //   ].includes(userId);

  //   if (!isAuthorized) {
  //     Logger.error("User not authorized");
  //     throw new UnauthorizedException("User not authorized");
  //   }

  //   return serviceProvided.toModel();
  // }
}
