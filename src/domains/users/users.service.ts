import UserEntity from '@architecture/entities/user.entity';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import UserTypeEntity from '@architecture/entities/user_type.entity';

@Injectable()
export class UsersService {
  saltRounds = 10;

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserTypeEntity) private readonly userTypeRepository: Repository<UserTypeEntity>,
  ) { }

  async create(user: CreateUserDTO): Promise<UserEntity> {

    const userExists = await this.userRepository.findOne({ where: { email: user.email } });
    if (userExists) {
      Logger.error('User already exists');
      throw new BadRequestException('Invalid email');
    }

    const hash = await bcrypt.hash(user.password, this.saltRounds);
    
    const userType = await this.userTypeRepository.findOne({ where: { id: user.userType } });
    if (!userType) {
      Logger.error('User type not found');
      throw new BadRequestException('User type not found');
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

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { email }, relations: ['type'] });
  }

}
