import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreatePets1737933338196 implements MigrationInterface {
  name = "CreatePets1737933338196";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "pets",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "name", type: "varchar", length: "255" },
          { name: "birthday", type: "date", isNullable: true },
          { name: "comments", type: "text", isNullable: true },
          { name: "breed_id", type: "int" },
          { name: "user_id", type: "int" },
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
      "pets",
      new TableForeignKey({
        columnNames: ["breed_id"],
        referencedTableName: "breed",
        referencedColumnNames: ["id"],
        name: "FK_pets_breed_id",
      }),
    );

    await queryRunner.createForeignKey(
      "pets",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        name: "FK_pets_user_id",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("pets", "FK_pets_breed_id");
    await queryRunner.dropForeignKey("pets", "FK_pets_user_id");
    await queryRunner.dropTable("pets");
  }
}
