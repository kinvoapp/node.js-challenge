import { MigrationInterface, QueryRunner } from "typeorm";

export class default1657483240351 implements MigrationInterface {
  name = "default1657483240351";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`transaction_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`entry\` float NOT NULL, \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`transaction_history\``);
  }
}
