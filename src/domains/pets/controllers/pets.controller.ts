import { HttpResponseDTO } from '@architecture/dtos/HttpResponseDTO';
import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { PetsService } from '@pets/services/pets.service';
import { CreatePetDTO } from '@pets/dtos/CreatePetDTO';
import { JoiPipe } from 'nestjs-joi';
import { RequestDTO } from '@architecture/dtos/RequestDTO';
import { ListPetsDTO } from '@pets/dtos/ListPetsDTO';
import { UpdatePetDTO } from '@pets/dtos/UpdatePetDTO';

@Controller('pets')
export class PetsController {

  constructor(
    private readonly petsService: PetsService
  ) { }

  @Post()
  async addPet(
    @Body(JoiPipe)
    createPetDTO: CreatePetDTO,
    @Req() req: RequestDTO,
  ) {
    const userId = req.user.id;
    Logger.log(`User ${userId} is creating a new pet`);
    const pet = await this.petsService.createPet(createPetDTO, userId);
    return new HttpResponseDTO(HttpStatus.CREATED, "Pet created successfully", pet);
  }

  @Get()
  async getPets(
    @Req() req: RequestDTO,
    @Query() query: ListPetsDTO,
  ) {
    const userId = req.user.id;
    Logger.log(`User ${userId} is retrieving pets`);
    const pets = await this.petsService.getPets(query, userId);
    return new HttpResponseDTO(HttpStatus.OK, "Pets retrieved successfully", pets);
  }

  @Delete(":id")
  async deletePet(
    @Param("id") id: number,
    @Req() req: RequestDTO,
  ) {
    const userId = req.user.id;
    Logger.log(`User ${userId} is deleting a pet with id ${id}`);
    await this.petsService.deletePet(userId, id);
    return new HttpResponseDTO(HttpStatus.OK, "Pet deleted successfully");
  }

  @Patch(":id")
  async updatePet(
    @Param("id") id: number,
    @Body(JoiPipe)
    updatePetDTO: UpdatePetDTO,
    @Req() req: RequestDTO,
  ) {
    const userId = req.user.id;
    Logger.log(`User ${userId} is updating a pet with id ${id}`);
    await this.petsService.updatePet(updatePetDTO, userId, id);
    return new HttpResponseDTO(HttpStatus.OK, "Pet updated successfully");
  }

}
