import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateServiceOrder1737841405058 implements MigrationInterface {
  name = "CreateServiceOrder1737841405058";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "service_order",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "service_id",
            type: "int",
          },
          {
            name: "customer_id",
            type: "int",
          },
          {
            name: "provider_id",
            type: "int",
          },
          {
            name: "address_id",
            type: "int",
          },
          {
            name: "duration_minutes",
            type: "int",
          },
          {
            name: "is_accepted",
            type: "boolean",
            isNullable: true,
          },
          {
            name: "is_done",
            type: "boolean",
            default: false,
          },
          {
            name: "is_started",
            type: "boolean",
            default: false,
          },
          {
            name: "is_canceled",
            type: "boolean",
            default: false,
          },
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
      "service_order",
      new TableForeignKey({
        columnNames: ["customer_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        name: "FK_service_order_customer_id",
      }),
    );

    await queryRunner.createForeignKey(
      "service_order",
      new TableForeignKey({
        columnNames: ["provider_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        name: "FK_service_order_provider_id",
      }),
    );

    await queryRunner.createForeignKey(
      "service_order",
      new TableForeignKey({
        columnNames: ["service_id"],
        referencedTableName: "services",
        referencedColumnNames: ["id"],
        name: "FK_service_order_service_id",
      }),
    );

    await queryRunner.createForeignKey(
      "service_order",
      new TableForeignKey({
        columnNames: ["address_id"],
        referencedTableName: "address",
        referencedColumnNames: ["id"],
        name: "FK_service_order_address_id",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "service_order",
      "FK_service_order_customer_id",
    );
    await queryRunner.dropForeignKey(
      "service_order",
      "FK_service_order_provider_id",
    );
    await queryRunner.dropForeignKey(
      "service_order",
      "FK_service_order_address_id",
    );
    await queryRunner.dropForeignKey(
      "service_order",
      "FK_service_order_service_id",
    );
    await queryRunner.dropTable("service_order");
  }
}
