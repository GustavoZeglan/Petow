import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AlterTableBreeds1741710630847 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("breed", ["height", "api_id", "breed_for"]);

    await queryRunner.addColumn(
      "breed",
      new TableColumn({
        name: "description",
        type: "text",
      }),
    );

    await queryRunner.addColumn(
      "breed",
      new TableColumn({
        name: "specie_id",
        type: "integer",
      }),
    );

    await queryRunner.createForeignKey(
      "breed",
      new TableForeignKey({
        columnNames: ["specie_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "species",
        onDelete: "SET NULL",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
