import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateServiceProvided1738531887853 implements MigrationInterface {
  name = "CreateServiceProvided1738531887853";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "service_provided",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "price",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "provider_service_id",
            type: "int",
          },
          {
            name: "service_order_id",
            type: "int",
          },
          {
            name: "start_date",
            type: "timestamp",
          },
          {
            name: "end_date",
            type: "timestamp",
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
      "service_provided",
      new TableForeignKey({
        columnNames: ["provider_service_id"],
        referencedTableName: "provider_service",
        referencedColumnNames: ["id"],
        name: "FK_service_provided_provider_service_id",
      }),
    );

    await queryRunner.createForeignKey(
      "service_provided",
      new TableForeignKey({
        columnNames: ["service_order_id"],
        referencedTableName: "service_order",
        referencedColumnNames: ["id"],
        name: "FK_service_provided_service_order_id",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "service_provided",
      "FK_service_provided_provider_service_id",
    );
    await queryRunner.dropForeignKey(
      "service_provided",
      "FK_service_provided_service_order_id",
    );

    await queryRunner.dropTable("service_provided");
  }
}
