import { MigrationInterface, QueryRunner } from "typeorm";

export class default1657500701521 implements MigrationInterface {
    name = 'default1657500701521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expenses" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "earnings" ADD "date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "earnings" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "date"`);
    }

}
