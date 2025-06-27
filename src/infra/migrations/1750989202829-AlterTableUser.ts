import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableUser1750989202829 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "description",
        type: "text",
        isNullable: true,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "description")
  }

}
