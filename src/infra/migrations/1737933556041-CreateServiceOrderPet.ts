import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateServiceOrderPet1737933556041 implements MigrationInterface {
  name = "CreateServiceOrderPet1737933556041";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "service_order_pet",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "pet_id", type: "int" },
          { name: "service_order", type: "int" },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "service_order_pet",
      new TableForeignKey({
        columnNames: ["pet_id"],
        referencedTableName: "pets",
        referencedColumnNames: ["id"],
        name: "FK_service_order_pet_pet_id",
      }),
    );

    await queryRunner.createForeignKey(
      "service_order_pet",
      new TableForeignKey({
        columnNames: ["service_order"],
        referencedTableName: "service_order",
        referencedColumnNames: ["id"],
        name: "FK_service_order_service_order_id",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "service_order_pet",
      "FK_service_order_pet_pet_id",
    );
    await queryRunner.dropForeignKey(
      "service_order_pet",
      "FK_service_order_service_order_id",
    );
    await queryRunner.dropTable("service_order_pet");
  }
}
