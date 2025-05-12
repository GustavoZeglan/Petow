import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
import { RequestDTO } from "@architecture/dtos/RequestDTO";
import { Controller, Get, HttpStatus, Logger, Req } from "@nestjs/common";
import { BreedsService } from "@pets/services/breeds.service";

@Controller("breeds")
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Get("/dogs")
  async getDogsBreeds(@Req() req: RequestDTO) {
    Logger.log(`User ${req.user.id} requested dogs breeds`);
    const breeds = await this.breedsService.getDogsBreeds();
    return new HttpResponseDTO(
      HttpStatus.OK,
      "Dogs breeds retrieved successfully",
      breeds,
    );
  }

  @Get("/cats")
  async getCatsBreeds(@Req() req: RequestDTO) {
    Logger.log(`User ${req.user.id} requested cats breeds`);
    const breeds = await this.breedsService.getCatsBreeds();
    return new HttpResponseDTO(
      HttpStatus.OK,
      "Cats breeds retrieved successfully",
      breeds,
    );
  }
}
