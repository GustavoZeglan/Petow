import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBreed1737933180088 implements MigrationInterface {
  name = "CreateBreed1737933180088";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "breed",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "api_id", type: "int" },
          { name: "name", type: "varchar", length: "255" },
          {
            name: "breed_for",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          { name: "temperament", type: "text", isNullable: true },
          {
            name: "life_span",
            type: "varchar",
            length: "50",
            isNullable: true,
          },
          { name: "weight", type: "varchar", length: "50", isNullable: true },
          { name: "height", type: "varchar", length: "50", isNullable: true },
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("breed");
  }
}
