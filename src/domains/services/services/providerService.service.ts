import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import ProviderServiceRepository from "@architecture/repositories/provider_service.repository";
import ServiceRepository from "@architecture/repositories/service.repository";
import UserRepository from "@architecture/repositories/user.repository";
import { UpdateProviderServiceDTO } from "@services/dtos/UpdateProviderServiceDTO";
import { ListProviderServiceDTO } from "@services/dtos/ListProviderServiceDTO";

@Injectable()
export class ProviderServiceService {
  constructor(
    private readonly providerServiceRepository: ProviderServiceRepository,
    private readonly serviceRepository: ServiceRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findProviderServicesByUserId(
    userId: number,
    query: ListProviderServiceDTO,
  ) {
    const providerServices = await this.providerServiceRepository.findMany(
      query,
      userId,
    );

    Logger.log(`Found ${providerServices.length} provider services`);

    for (const providerService of providerServices) {
      providerService.toModel();
    }

    return providerServices;
  }

  async updateProviderService(
    userId: number,
    id: number,
    dto: UpdateProviderServiceDTO,
  ) {
    const providerService = await this.providerServiceRepository.findOne({
      where: { id },
      relations: { provider: true },
    });

    if (!providerService) {
      Logger.error(`Provider service with id ${id} not found`);
      throw new Error(`Provider service with id ${id} not found`);
    }

    if (userId !== providerService.provider.id) {
      Logger.error(
        `User ${userId} is not authorized to update provider service ${id}`,
      );
      throw new UnauthorizedException(
        `User ${userId} is not authorized to update provider service ${id}`,
      );
    }

    const providerServiceToUpdate = this.providerServiceRepository.create({
      ...providerService,
      ...dto,
    });

    const updatedProviderService = await this.providerServiceRepository.save(
      providerServiceToUpdate,
    );
    return updatedProviderService.toModel();
  }

  async createProviderService(
    price: number,
    serviceId: number,
    providerId: number,
  ) {
    Logger.log(`Creating provider service for user ${providerId}`);

    const service = await this.serviceRepository.findOneBy({ id: serviceId });
    if (!service) {
      Logger.error(`Service with id ${serviceId} not found`);
      throw new BadRequestException(`Service with id ${serviceId} not found`);
    }

    const provider = await this.userRepository.findOneBy({ id: providerId });
    if (!provider) {
      Logger.error(`Provider with id ${providerId} not found`);
      throw new UnauthorizedException(
        `Provider with id ${providerId} not found`,
      );
    }

    const providerService = this.providerServiceRepository.create({
      price,
      service,
      provider,
    });
    await this.providerServiceRepository.save(providerService);
    return providerService.toModel();
  }
}
