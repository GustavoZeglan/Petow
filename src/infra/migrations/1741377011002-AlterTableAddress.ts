import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableAddress1741377011002 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn("address", "address_type");
      await queryRunner.dropColumn("address", "complement");
      await queryRunner.dropColumn("address", "neighborhood");
      await queryRunner.dropColumn("address", "country");
      await queryRunner.changeColumn("address", "state", new TableColumn({
        name: "state",
        type: "varchar",
        length: "20"
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
