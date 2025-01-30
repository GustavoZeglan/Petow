import UserTypeEntity from "src/core/entities/user_type.entity";

export default class UserTypeDTO {
  id: number;
  type: string;

  constructor(id: number, type: string) {
    this.id = id;
    this.type = type;
  }

  static fromEntity(entity: UserTypeEntity): UserTypeDTO {
    return new UserTypeDTO(entity.id, entity.type);
  }
}
