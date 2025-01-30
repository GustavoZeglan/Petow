import UserEntity from "src/core/entities/user.entity";
import { genderEnum } from "src/common/enums/gender.enum";
import UserTypeDTO from "src/common/classes/UserTypeDTO";

export default class UserDTO {
  id: number;
  name: string;
  email: string;
  gender: genderEnum;
  cpf: string;
  phone: string;
  userType: UserTypeDTO;

  constructor(
    id: number,
    name: string,
    email: string,
    gender: genderEnum,
    cpf: string,
    phone: string,
    userType: UserTypeDTO,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.cpf = cpf;
    this.phone = phone;
    this.userType = userType;
  }

  static fromEntity(entity: UserEntity): UserDTO {
    return new UserDTO(
      entity.id,
      entity.name,
      entity.email,
      entity.gender,
      entity.cpf,
      entity.phone,
      UserTypeDTO.fromEntity(entity.type),
    );
  }
}
