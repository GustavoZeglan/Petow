import { Injectable, Logger } from '@nestjs/common';
import ProviderServiceRepository from '@services/repositories/provider-service.repository';
import { ProviderServiceDTO } from '@app/domains/services/dtos/ProviderServiceDTO';
import ServiceRepository from '@services/repositories/service.repository';
import UserRepository from '@users/repositories/user.repository';

@Injectable()
export class ProviderServiceService {
  
  constructor(
    private readonly providerServiceRepository: ProviderServiceRepository,
    private readonly serviceRepository: ServiceRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findProviderServicesByUserId(userId: number) {
    const providerServices = await this.providerServiceRepository.findByUserId(userId);
    const providerServicesDTO: ProviderServiceDTO[] = []; 

    Logger.log(`Found ${providerServices.length} provider services`);

    for (const providerService of providerServices) {
      const dto = ProviderServiceDTO.fromEntity(providerService);
      providerServicesDTO.push(dto);
    }
 
    return providerServicesDTO;
  }  

  async createProviderService(price: number, serviceId: number, providerId: number) {

    Logger.log(`Creating provider service for user ${providerId}`);

    const service = await this.serviceRepository.findOneBy({ id: serviceId });
    if (!service) {
      Logger.error(`Service with id ${serviceId} not found`);
      throw new Error(`Service with id ${serviceId} not found`);
    }

    const provider = await this.userRepository.findOneBy({ id: providerId });
    if (!provider) {
      Logger.error(`Provider with id ${providerId} not found`);
      throw new Error(`Provider with id ${providerId} not found`);
    }
    
    const providerService = this.providerServiceRepository.create({
      price,
      service,
      provider
    });
    await this.providerServiceRepository.save(providerService);
    return providerService;
  }

}
