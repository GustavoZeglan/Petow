import { Body, Controller, Get, HttpStatus, Logger, Post } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { CreateUserDTO } from '@users/dtos/CreateUserDTO';
import { JoiPipe } from 'nestjs-joi';
import { HttpResponseDTO } from '@architecture/dtos/HttpResponseDTO';
import { Public } from '@architecture/decorators/public';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @Public()
  async create(
    @Body(JoiPipe) body: CreateUserDTO,
  ) {
    Logger.log("Trying to create user");
    const user = await this.usersService.create(body);
    return new HttpResponseDTO(HttpStatus.CREATED, "User created successfully", user);
  }

}
