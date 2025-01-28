import AddressEntity from "src/core/entities/address.entity";
import { DataSource, Repository } from "typeorm";

export const AddressRepository = (dataSource: DataSource) => {
  return dataSource.getRepository(AddressEntity).extend({
    async findById(this: Repository<AddressEntity>, addressId: number) {
      return this.findOne({
        where: {
          id: addressId,
        },
      });
    },
  });
};
