import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import ServiceOrderRepository from "@architecture/repositories/service_order.repository";
import { DataSource, QueryRunner } from "typeorm";
import { CreateServiceOrderDTO } from "@services/dtos/CreateServiceOrderDTO";
import UserRepository from "@architecture/repositories/user.repository";
import ServiceRepository from "@architecture/repositories/service.repository";
import AddressRepository from "@architecture/repositories/address.repository";
import ServiceOrderEntity from "@architecture/entities/service_order.entity";
import ServiceOrderPetEntity from "@architecture/entities/service_order_pet.entity";
import PetEntity from "@architecture/entities/pet.entity";
import PetRepository from "@architecture/repositories/pet.repository";
import { ListServiceOrderDTO } from "@services/dtos/ListServiceOrderDTO";
import { UpdateServiceOrderDTO } from "@services/dtos/UpdateServiceOrderDTO";

@Injectable()
export class ServiceOrderService {
  constructor(
    private readonly serviceOrderRepository: ServiceOrderRepository,
    private readonly userRepository: UserRepository,
    private readonly serviceRepository: ServiceRepository,
    private readonly addressRepository: AddressRepository,
    private readonly petRepository: PetRepository,
    private readonly dataSource: DataSource,
  ) {}

  async createServiceOrder(
    userId: number,
    createServiceOrderDTO: CreateServiceOrderDTO,
  ) {
    const { service, customer, provider, address, pets } =
      await this.validateCreateServiceOrder(userId, createServiceOrderDTO);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const serviceOrderToCreate = this.serviceOrderRepository.create({
        service,
        customer,
        provider,
        address,
        durationMinutes: createServiceOrderDTO.durationMinutes,
        isDone: false,
        isCanceled: false,
      });

      const serviceOrder = await queryRunner.manager.save(
        ServiceOrderEntity,
        serviceOrderToCreate,
      );

      await this.createServiceOrderPet(queryRunner, pets, serviceOrder);

      await queryRunner.commitTransaction();

      const serviceOrderWithRelations =
        await this.serviceOrderRepository.findServiceOrderInfo(serviceOrder.id);

      if (!serviceOrderWithRelations) {
        throw new InternalServerErrorException(
          "Failed to load service order with relations",
        );
      }

      return serviceOrderWithRelations.toModel();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      Logger.error(`An error was occurred trying to create a serviceOrder`);
      Logger.error(error);
      throw new InternalServerErrorException(
        "An unexpected error was occurred",
      );
    } finally {
      await queryRunner.release();
    }
  }

  private async validateCreateServiceOrder(
    userId: number,
    createServiceOrderDTO: CreateServiceOrderDTO,
  ) {
    const service = await this.serviceRepository.findOneBy({
      id: createServiceOrderDTO.serviceId,
    });
    if (!service) throw new BadRequestException(`Invalid service ID`);

    const customer = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!customer) throw new BadRequestException(`Invalid customer ID`);

    const provider = await this.userRepository.findOneBy({
      id: createServiceOrderDTO.providerId,
    });
    if (!provider) throw new BadRequestException(`Invalid tutor ID`);

    const address = await this.addressRepository.findOneBy({
      id: createServiceOrderDTO.addressId,
    });
    if (!address) throw new BadRequestException(`Invalid address ID`);

    const pets = await this.petRepository.findByIdsWithUserValidation(
      createServiceOrderDTO.pets,
      userId,
    );

    if (pets.length !== createServiceOrderDTO.pets.length) {
      throw new BadRequestException("One or more pet IDs are invalid");
    }

    return { service, customer, provider, address, pets };
  }

  async createServiceOrderPet(
    queryRunner: QueryRunner,
    pets: PetEntity[],
    serviceOrder: ServiceOrderEntity,
  ) {
    const serviceOrdersPetsToCreate = pets.map((validatedPet) =>
      queryRunner.manager.create(ServiceOrderPetEntity, {
        pet: validatedPet,
        serviceOrder,
      }),
    );

    await queryRunner.manager.save(
      ServiceOrderPetEntity,
      serviceOrdersPetsToCreate,
    );
  }

  async updateServiceOrderFlags(
    serviceOrderId: number,
    userId: number,
    updateServiceOrderDTO: UpdateServiceOrderDTO,
  ) {
    const serviceOrder = await this.serviceOrderRepository.findOne({
      where: { id: serviceOrderId },
      relations: { customer: true, provider: true },
    });
    if (!serviceOrder) throw new NotFoundException("Service Order not found");

    if (
      ![serviceOrder.customer.id, serviceOrder.provider.id].includes(userId)
    ) {
      throw new ForbiddenException(
        "You are not allowed to update this service order",
      );
    }

    const serviceOrderToUpdate = this.serviceOrderRepository.create({
      ...serviceOrder,
      ...updateServiceOrderDTO,
    });

    const updatedServiceOrder =
      await this.serviceOrderRepository.save(serviceOrderToUpdate);
    return updatedServiceOrder.toModel();
  }

  async getServiceOrdersByUser(query: ListServiceOrderDTO, userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException("User not found");

    const serviceOrders =
      await this.serviceOrderRepository.findServiceOrdersByUser(query, userId);

    for (const serviceOrder of serviceOrders) {
      serviceOrder.toModel();
    }

    return serviceOrders;
  }

  async getServiceOrdersToAccept(query: ListServiceOrderDTO, userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException("User not found");

    const serviceOrders =
      await this.serviceOrderRepository.findServiceOrdersToAccept(
        query,
        userId,
      );

    for (const serviceOrder of serviceOrders) {
      serviceOrder.toModel();
    }

    return serviceOrders;
  }

  async getAcceptedServiceOrdersOfUser(
    query: ListServiceOrderDTO,
    userId: number,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException("User not found");

    const serviceOrders =
      await this.serviceOrderRepository.findAcceptedServiceOrders(
        query,
        userId,
      );

    for (const serviceOrder of serviceOrders) {
      serviceOrder.toModel();
    }

    return serviceOrders;
  }

  async getServiceOrdersOfUser(
    query: ListServiceOrderDTO,
    userId: number,
    role?: string,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException("User not found");

    const serviceOrders = await this.serviceOrderRepository.findServiceOrders(
      query,
      userId,
      role,
    );

    for (const serviceOrder of serviceOrders) {
      serviceOrder.toModel();
    }

    return serviceOrders;
  }

  async getServiceOrderInfo(userId: number, id: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException("User not found");

    const serviceOrder =
      await this.serviceOrderRepository.findServiceOrderInfo(id);

    if (!serviceOrder) throw new NotFoundException("Service Order not found");

    if (![serviceOrder.customer.id, serviceOrder.provider.id].includes(userId))
      throw new UnauthorizedException("You are not authorized");

    serviceOrder?.toModel();

    return serviceOrder;
  }
}
