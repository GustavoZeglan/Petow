import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
import { RequestDTO } from "@architecture/dtos/RequestDTO";
import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Query,
  Req,
} from "@nestjs/common";
import { BreedsService } from "@pets/services/breeds.service";
import { ListBreedsDTO } from "@pets/dtos/ListBreedsDTO";
import { JoiPipe } from "nestjs-joi";

@Controller("breeds")
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Get()
  async getBreeds(
    @Req() req: RequestDTO,
    @Query(JoiPipe) query: ListBreedsDTO,
  ) {
    Logger.log(`User ${req.user.id} requested breeds`);
    const breeds = await this.breedsService.getBreeds(query);
    return new HttpResponseDTO(
      HttpStatus.OK,
      "Breeds retrieved successfully",
      breeds,
    );
  }
}
