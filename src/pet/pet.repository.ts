import PetEntity from "@core/entities/pet.entity";
import { DataSource, In, Repository } from "typeorm";

export const PetRepository = (dataSource: DataSource) => {
  return dataSource.getRepository(PetEntity).extend({
    async findByIdsWithUserValidation(
      this: Repository<PetEntity>,
      petIds: number[],
      customerId: number,
    ) {
      return this.find({
        where: {
          id: In(petIds),
          user: {
            id: customerId,
          },
        },
      });
    },
  });
};
