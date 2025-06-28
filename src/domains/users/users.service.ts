import UserEntity from "@architecture/entities/user.entity";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";
import * as bcrypt from "bcryptjs";
import { CreateUserDTO } from "./dtos/CreateUserDTO";
import UserTypeEntity from "@architecture/entities/user_type.entity";
import { CreateAddressDTO } from "@users/dtos/CreateAddressDTO";
import { UpdateUserDTO } from "./dtos/UpdateUserDTO";
import UserRepository from "@architecture/repositories/user.repository";
import AddressRepository from "@architecture/repositories/address.repository";

@Injectable()
export class UsersService {
  saltRounds = 10;

  constructor(
    private readonly userRepository: UserRepository,
    @InjectRepository(UserTypeEntity)
    private readonly userTypeRepository: Repository<UserTypeEntity>,
    private readonly addressRepository: AddressRepository,
  ) {}

  async create(user: CreateUserDTO): Promise<UserEntity> {
    const userExists = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (userExists) {
      Logger.error("User already exists");
      throw new BadRequestException("Invalid email");
    }

    const hash = await bcrypt.hash(user.password, this.saltRounds);

    const userType = await this.userTypeRepository.findOne({
      where: { id: user.userType },
    });
    if (!userType) {
      Logger.error("User type not found");
      throw new BadRequestException("User type not found");
    }

    const userToCreate = this.userRepository.create({
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      phone: user.phone,
      password: hash,
      type: userType,
    });

    return (await this.userRepository.save(userToCreate)).toModel();
  }

  async addAddress(userId: number, dto: CreateAddressDTO) {
    const user = await this.findOne(userId);
    if (!user) {
      Logger.error("User not found");
      throw new BadRequestException("User not found");
    }

    const addressToCreate = this.addressRepository.create({
      ...dto,
      user,
    });

    const address = await this.addressRepository.save(addressToCreate);
    if (!address) {
      Logger.error("Address not created");
      throw new InternalServerErrorException(
        "An error occurred while creating the address",
      );
    }
    address.toModel();

    return address;
  }

  async getAddress(userId: number) {
    const address = await this.addressRepository.find({
      where: { user: { id: userId } },
    });
    for (const addressItem of address) {
      addressItem.toModel();
    }
    return address;
  }

  async updateUser(updateUserDTO: UpdateUserDTO, userId: number) {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (updateUserDTO.userType) {
      const userType = await this.userTypeRepository.findOne({
        where: { id: updateUserDTO.userType },
      });
      if (!userType) {
        Logger.error("User type not found");
        throw new BadRequestException("User type not found");
      } else {
        user.type = userType;
      }
    }

    await this.userRepository.save({
      ...user,
      ...updateUserDTO,
    });
  }

  async deleteAddress(userId: number, addressId: number) {
    const address = await this.addressRepository.findOne({
      where: { id: addressId, user: { id: userId } },
    });
    if (!address) {
      Logger.error("Address not found");
      throw new BadRequestException("Address not found");
    }

    await this.addressRepository.delete(addressId);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity | null> {
    const user = await this.userRepository.findUserById(id);
    user?.toModel();
    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ["type"],
    });
  }
}
