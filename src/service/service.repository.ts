import ServiceEntity from "src/core/entities/service.entity";
import { DataSource, Repository } from "typeorm";

export const ServiceRepository = (dataSource: DataSource) => {
  return dataSource.getRepository(ServiceEntity).extend({
    async findAll(this: Repository<ServiceEntity>) {
      return this.find();
    },
  });
};
