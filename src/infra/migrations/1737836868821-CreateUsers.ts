import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateUsers1737836868821 implements MigrationInterface {
  name = "CreateUsers1737836868821";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
            length: "80",
          },
          {
            name: "cpf",
            type: "varchar",
            isUnique: true,
            length: "11",
          },
          {
            name: "phone",
            type: "varchar",
            length: "50",
          },
          {
            name: "password",
            type: "text",
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
          {
            name: "user_type_id",
            type: "int",
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "users",
      new TableForeignKey({
        columnNames: ["user_type_id"],
        referencedTableName: "user_type",
        referencedColumnNames: ["id"],
        name: "FK_user_user_type_id",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("users", "FK_user_user_type_id");
    await queryRunner.dropTable("users");
  }
}
