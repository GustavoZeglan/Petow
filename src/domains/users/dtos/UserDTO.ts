import UserEntity from "@users/entities/user.entity";
import { genderEnum } from "@architecture/enums/gender.enum";
import UserTypeDTO from "@users/dtos/UserTypeDTO";

export default class UserDTO {
  id: number;
  name: string;
  email: string;
  gender: genderEnum;
  cpf: string;
  phone: string;
  userType?: UserTypeDTO;

  constructor(
    id: number,
    name: string,
    email: string,
    gender: genderEnum,
    cpf: string,
    phone: string,
    userType?: UserTypeDTO,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.cpf = cpf;
    this.phone = phone;
    if (userType) this.userType = userType;
  }

  static fromEntity(entity: UserEntity): UserDTO {
    return new UserDTO(
      entity.id,
      entity.name,
      entity.email,
      entity.gender,
      entity.cpf,
      entity.phone,
      entity.type ? UserTypeDTO.fromEntity(entity.type) : undefined,
    );
  }
}
