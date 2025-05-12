import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { UsersService } from "@users/users.service";
import { CreateUserDTO } from "@users/dtos/CreateUserDTO";
import { JoiPipe } from "nestjs-joi";
import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
import { Public } from "@architecture/decorators/public";
import { CreateAddressDTO } from "@users/dtos/CreateAddressDTO";
import { RequestDTO } from "@architecture/dtos/RequestDTO";
import { UpdateUserDTO } from "@users/dtos/UpdateUserDTO";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  async create(@Body(JoiPipe) body: CreateUserDTO) {
    Logger.log("Trying to create user");
    const user = await this.usersService.create(body);
    return new HttpResponseDTO(
      HttpStatus.CREATED,
      "User created successfully",
      user,
    );
  }

  @Patch()
  async updateUser(
    @Req() req: RequestDTO,
    @Body(JoiPipe)
    updatePetDTO: UpdateUserDTO,
  ) {
    const userId = req.user.id;
    Logger.log(`Trying to update user ${userId}`);
    await this.usersService.updateUser(updatePetDTO, userId);
    return new HttpResponseDTO(HttpStatus.OK, "User updated successfully");
  }

  @Post("address")
  async addAddress(
    @Body(JoiPipe) body: CreateAddressDTO,
    @Req() req: RequestDTO,
  ) {
    const userId = req.user.id;
    Logger.log(`User ${userId} is trying to add address`);
    const address = await this.usersService.addAddress(userId, body);
    return new HttpResponseDTO(
      HttpStatus.CREATED,
      "Address added successfully",
      address,
    );
  }

  @Get("address")
  async getAddress(@Req() req: RequestDTO) {
    const userId = req.user.id;
    Logger.log(`User ${userId} is trying to get address`);
    const address = await this.usersService.getAddress(userId);
    return new HttpResponseDTO(
      HttpStatus.OK,
      "Address retrieved successfully",
      address,
    );
  }

  @Delete("address/:id")
  async deleteAddress(@Req() req: RequestDTO, @Param("id") id: number) {
    const userId = req.user.id;
    Logger.log(`User ${userId} is trying to delete address ${id}`);
    const address = await this.usersService.deleteAddress(userId, id);
    return new HttpResponseDTO(HttpStatus.OK, "Address deleted successfully");
  }
}
