import UserEntity from "src/core/entities/user.entity";
import { DataSource, Repository } from "typeorm";

export const UserRepository = (dataSource: DataSource) => {
  return dataSource.getRepository(UserEntity).extend({
    async findById(this: Repository<UserEntity>, userId: number) {
      return this.findOne({
        where: {
          id: userId,
        },
      });
    },
  });
};
