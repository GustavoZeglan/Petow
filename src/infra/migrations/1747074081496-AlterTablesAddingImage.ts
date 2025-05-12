import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTablesAddingImage1747074081496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "pets",
      new TableColumn({
        name: "image",
        type: "varchar",
        isNullable: true,
        comment: "ID da imagem no MinIO",
      }),
    );

    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "image",
        type: "varchar",
        isNullable: true,
        comment: "ID da imagem no MinIO",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("pets", "image");
    await queryRunner.dropColumn("users", "image");
  }
}
