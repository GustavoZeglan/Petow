import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateAddress1737837851157 implements MigrationInterface {
  name = "CreateAddress1737837851157";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "address",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "address_type",
            type: "varchar",
            length: "100",
          },
          {
            name: "street",
            type: "varchar",
            length: "255",
          },
          {
            name: "number",
            type: "varchar",
            length: "10",
          },
          {
            name: "complement",
            type: "varchar",
            length: "255",
          },
          {
            name: "neighborhood",
            type: "varchar",
            length: "100",
          },
          {
            name: "city",
            type: "varchar",
            length: "100",
          },
          {
            name: "state",
            type: "varchar",
            length: "10",
          },
          {
            name: "zip_code",
            type: "varchar",
            length: "10",
          },
          {
            name: "country",
            type: "varchar",
            length: "100",
          },
          {
            name: "latitude",
            type: "decimal",
            precision: 10,
            scale: 7,
          },
          {
            name: "longitude",
            type: "decimal",
            precision: 10,
            scale: 7,
          },
          {
            name: "place_id",
            type: "varchar",
            length: "255",
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
      "address",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        name: "FK_address_user_id",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("address", "FK_address_user_id");
    await queryRunner.dropTable("address");
  }
}
