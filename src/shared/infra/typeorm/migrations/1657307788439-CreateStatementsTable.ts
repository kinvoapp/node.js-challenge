import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStatementsTable1657307788439 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "statements",

        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },

          {
            name: "amount",
            type: "decimal",
            precision: 6,
            scale: 2,
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "type",
            type: "enum",
            enum: ["income", "expense"],
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("statements");
  }
}
