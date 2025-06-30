import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import ProviderServiceRepository from "@architecture/repositories/provider_service.repository";
import ServiceRepository from "@architecture/repositories/service.repository";
import UserRepository from "@architecture/repositories/user.repository";
import { UpdateProviderServiceDTO } from "@services/dtos/UpdateProviderServiceDTO";
import { ListProviderServiceDTO } from "@services/dtos/ListProviderServiceDTO";
import { ServiceEnum } from "@architecture/enums/service.enum";
import { GetProviderServiceDTO } from "@services/dtos/GetProvidersDTO";

@Injectable()
export class ProviderServiceService {
  constructor(
    private readonly providerServiceRepository: ProviderServiceRepository,
    private readonly serviceRepository: ServiceRepository,
    private readonly userRepository: UserRepository,
  ) { }

  async findProviders(
    serviceEnum: ServiceEnum,
    userId: number,
    query: GetProviderServiceDTO,
  ) {
    const service = await this.serviceRepository.findOneBy({
      type: serviceEnum,
    });
    if (!service) throw new InternalServerErrorException("Service not found");
    const services = await this.providerServiceRepository.findProviders(
      service,
      userId,
      query,
    );
    for (const s of services) {
      s.toModel();
    }
    return services;
  }

  async findProviderServiceByUserAndServiceId(
    userId: number,
    id: number,
  ) {

    const service = await this.providerServiceRepository.findOne({
      where: { service: { id: id }, provider: { id: userId } }
    })
    if (!service) throw new NotFoundException(`Provider service not found`);

    return service.toModel();
  }

  async findProviderServicesById(id: number, query: ListProviderServiceDTO) {
    const providerService =
      await this.providerServiceRepository.findOneWithOptions(id, query);

    if (!providerService) {
      Logger.error(`Provider service with id ${id} not found`);
      throw new NotFoundException(`Provider service with id ${id} not found`);
    }

    Logger.log(`Found ${providerService.id} provider service`);

    providerService.toModel();

    return providerService;
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
