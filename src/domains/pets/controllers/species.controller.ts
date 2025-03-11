import { HttpResponseDTO } from '@architecture/dtos/HttpResponseDTO';
import { RequestDTO } from '@architecture/dtos/RequestDTO';
import { Controller, Get, HttpStatus, Logger, Query, Req } from '@nestjs/common';
import { SpeciesService } from '@pets/services/species.service';
import { ListSpeciesDTO } from '@pets/dtos/ListSpecieDTO';

@Controller('species')
export class SpeciesController {

  constructor(
    private readonly speciesService: SpeciesService,
  ) {}

  @Get()
  async findAll(
    @Req() req: RequestDTO,
    @Query() query: ListSpeciesDTO,
  ) {
    Logger.log(`User ${req.user.id} is trying to get all species`);
    const species = await this.speciesService.find(query);
    return new HttpResponseDTO(HttpStatus.OK, "Species retrieved successfully", species);
  }

}
