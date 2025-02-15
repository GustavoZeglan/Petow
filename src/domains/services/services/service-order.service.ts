import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import ServiceOrderRepository from "@services/repositories/service-order.repository";
import { QueryRunner } from "typeorm";
import { CreateServiceOrderDTO } from "@architecture/dtos/CreateServiceOrderDTO";
import UserRepository from "@users/repositories/user.repository";
import ServiceRepository from "@services/repositories/service.repository";
import AddressRepository from "@users/repositories/address.repository";
import ServiceOrderEntity from "@services/entities/service_order.entity";
import ServiceOrderPetEntity from "@services/entities/service_order_pet.entity";
import PetEntity from "@pets/entities/pet.entity";
import ServiceOrderDTO from "@app/domains/services/dtos/ServiceOrderDTO";
import PetRepository from "@pets/repositories/pet.repository";

@Injectable()
export class ServiceOrderService {

  constructor(
    private readonly serviceOrderRepository: ServiceOrderRepository,
    private readonly userRepository: UserRepository,
    private readonly serviceRepository: ServiceRepository,
    private readonly addressRepository: AddressRepository,
    private readonly petRepository: PetRepository,
  ) { }

  async createServiceOrder(createServiceOrderDTO: CreateServiceOrderDTO) {
    const { service, customer, provider, address, pets } =
      await this.validateCreateServiceOrder(createServiceOrderDTO);

    const queryRunner = this.serviceOrderRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const serviceOrderToCreate = this.serviceOrderRepository.create({
        service,
        customer,
        provider,
        address,
        durationMinutes: createServiceOrderDTO.duration_minutes,
        isAccepted: false,
        isDone: false,
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

      const serviceOrderDTO = ServiceOrderDTO.fromEntity(
        serviceOrderWithRelations,
      );
      return serviceOrderDTO;
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
    createServiceOrderDTO: CreateServiceOrderDTO,
  ) {
    const service = await this.serviceRepository.findOneBy({ id: createServiceOrderDTO.service_id });
    if (!service) throw new BadRequestException(`Invalid service ID`);

    const customer = await this.userRepository.findOneBy({ id: createServiceOrderDTO.customer_id });
    if (!customer) throw new BadRequestException(`Invalid customer ID`);

    const provider = await this.userRepository.findOneBy({ id: createServiceOrderDTO.provider_id });
    if (!provider) throw new BadRequestException(`Invalid tutor ID`);

    const address = await this.addressRepository.findOneBy({ id: createServiceOrderDTO.address_id });
    if (!address) throw new BadRequestException(`Invalid address ID`);

    const pets = await this.petRepository.findByIdsWithUserValidation(
      createServiceOrderDTO.pets,
      createServiceOrderDTO.customer_id,
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

  async markServiceOrderAsAccepted(serviceOrderId: number) {
    const serviceOrder = await this.serviceOrderRepository.findOneBy({
      id: serviceOrderId,
    });
    if (!serviceOrder) throw new NotFoundException("Service Order not found");

    if (serviceOrder.isAccepted)
      throw new BadRequestException("Service Order was already accepted");

    await this.serviceOrderRepository.markServiceOrderAsAccepted(
      serviceOrderId,
    );
  }

  async getServiceOrdersOfUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { type: true },
    });
    console.log(user)
    if (!user) throw new NotFoundException("User not found");

    const serviceOrders =
      await this.serviceOrderRepository.findServiceOrdersByUserId(
        userId,
        user.type.type,
      );
    const formattedServiceOrders = serviceOrders.map((serviceOrder) =>
      ServiceOrderDTO.fromEntity(serviceOrder),
    );

    return formattedServiceOrders;
  }
}
