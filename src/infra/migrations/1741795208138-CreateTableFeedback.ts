import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableFeedback1741795208138 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "feedback",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "description",
            type: "text",
            isNullable: false,
          },
          {
            name: "rating",
            type: "decimal",
            precision: 2,
            scale: 1,
            isNullable: false,
          },
          {
            name: "sender_user_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "receiver_user_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "feedback_type_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "service_provided_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "pet_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
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
      "feedback",
      new TableForeignKey({
        name: "fk_feedback_sender_user_id",
        columnNames: ["sender_user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
      }),
    );

    await queryRunner.createForeignKey(
      "feedback",
      new TableForeignKey({
        name: "fk_feedback_receiver_user_id",
        columnNames: ["receiver_user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
      }),
    );

    await queryRunner.createForeignKey(
      "feedback",
      new TableForeignKey({
        name: "fk_feedback_feedback_type_id",
        columnNames: ["feedback_type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "feedback_type",
      }),
    );

    await queryRunner.createForeignKey(
      "feedback",
      new TableForeignKey({
        name: "fk_feedback_service_provided_id",
        columnNames: ["service_provided_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "service_provided",
      }),
    );

    await queryRunner.createForeignKey(
      "feedback",
      new TableForeignKey({
        name: "fk_feedback_pet_id",
        columnNames: ["pet_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "pets",
      }),
    );

    await queryRunner.query(
      `ALTER TABLE "feedback" ADD CONSTRAINT "check_rating" CHECK ("rating" >= 0 AND "rating" <= 5)`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("feedback", "fk_feedback_sender_user_id");
    await queryRunner.dropForeignKey(
      "feedback",
      "fk_feedback_receiver_user_id",
    );
    await queryRunner.dropForeignKey(
      "feedback",
      "fk_feedback_feedback_type_id",
    );
    await queryRunner.dropForeignKey(
      "feedback",
      "fk_feedback_service_provided_id",
    );
    await queryRunner.dropForeignKey("feedback", "fk_feedback_pet_id_fk");
    await queryRunner.dropTable("feedback");
  }
}
