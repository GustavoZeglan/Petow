import ServiceEntity from "src/core/entities/service.entity";

export default class ServiceDTO {
  id: number;
  type: string;
  hasPath: boolean;
  isUnitary: boolean;

  constructor(id: number, type: string, hasPath: boolean, isUnitary: boolean) {
    this.id = id;
    this.type = type;
    this.hasPath = hasPath;
    this.isUnitary = isUnitary;
  }

  static fromEntity(entity: ServiceEntity): ServiceDTO {
    return new ServiceDTO(entity.id, entity.type, entity.hasPath, entity.isUnitary)
  }

} 
