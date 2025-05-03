import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableUsers1745796536989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "feedback_counter",
        type: "integer",
        default: 0,
      }),
    );

    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "feedback_sum",
        type: "integer",
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
