import { MigrationInterface, QueryRunner } from "typeorm";

export class default1657406570107 implements MigrationInterface {
  name = "default1657406570107";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`transaction_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`entry\` int NOT NULL, \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`transaction_history\``);
  }
}
