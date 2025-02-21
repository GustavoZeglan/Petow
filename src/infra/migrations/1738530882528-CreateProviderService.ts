import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateProviderService1738530882528 implements MigrationInterface {
  name = "CreateProviderService1738530882528";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "provider_service",
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
            name: "service_id",
            type: "int",
          },
          {
            name: "provider_id",
            type: "int",
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
      "provider_service",
      new TableForeignKey({
        columnNames: ["provider_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        name: "FK_provider_service_provider_id",
      }),
    );

    await queryRunner.createForeignKey(
      "provider_service",
      new TableForeignKey({
        columnNames: ["service_id"],
        referencedTableName: "services",
        referencedColumnNames: ["id"],
        name: "FK_provider_service_service_id",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "provider_service",
      "FK_provider_service_provider_id",
    );
    await queryRunner.dropForeignKey(
      "provider_service",
      "FK_provider_service_service_id",
    );

    await queryRunner.dropTable("provider_service");
  }
}
