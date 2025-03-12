import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTablePets1741709023921 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "pets",
      new TableColumn({
        name: "specie_id",
        type: "integer",
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      "pets",
      new TableColumn({
        name: "size",
        type: "enum",
        enum: ["small", "medium", "big"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
